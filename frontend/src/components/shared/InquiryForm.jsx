import { useId, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contacts } from "@/content/media";
import { localizePath } from "@/lib/locale";
import ContactAddressImage from "./ContactAddressImage";

const productIntents = ["technical", "custom"];
const partnershipIntents = ["coDevelopment", "partnership", "poc"];

export default function InquiryForm({ product, intent = product ? "technical" : "" }) {
  const { t, lang } = useLanguage();
  const id = useId();
  const initialForm = {
    name: "",
    email: "",
    company: "",
    category: intent || "0",
    timeline: "",
    message: "",
  };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");
  const categories = intent
    ? (product ? productIntents : partnershipIntents).map((key) => [key, t.contact.intents[key]])
    : Object.entries(t.contact.categories);
  const categoryLabel = intent
    ? t.contact.intents[form.category]
    : t.contact.categories[Number(form.category)];
  const subject = intent
    ? ["[RoboFounders]", categoryLabel, product?.name].filter(Boolean).join(" ")
    : "New inquiry from RoboFounders";
  const change = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ||
      !form.message.trim()
    ) {
      setResult("required");
      return;
    }
    setStatus("sending");
    setResult("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(contacts.endpoint, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
          category: categoryLabel,
          ...(intent && { inquiry_type: form.category, timeline: form.timeline.trim() }),
          product: product?.name || "",
          language: lang,
          _subject: subject,
          _cc: contacts.cc,
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      if (data.success === false || data.success === "false")
        throw new Error("Submission rejected");
      setResult("success");
      setForm(initialForm);
    } catch {
      setResult("error");
    } finally {
      clearTimeout(timeout);
      setStatus("idle");
    }
  };
  return (
    <form
      onSubmit={submit}
      className="inquiry-form"
      data-testid={product ? "product-inquiry-form" : "contact-form"}
      noValidate
    >
      <fieldset disabled={status === "sending"}>
        <legend className="sr-only">{t.contact.formTitle}</legend>
        <div className="form-grid">
          <label htmlFor={`${id}-name`}>
            {t.contact.name} *
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={change}
              required
              maxLength={120}
            />
          </label>
          <label htmlFor={`${id}-email`}>
            {t.contact.email} *
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={change}
              required
              maxLength={254}
            />
          </label>
        </div>
        <label htmlFor={`${id}-company`}>
          {t.contact.company} <small>({t.contact.optional})</small>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={change}
            maxLength={160}
          />
        </label>
        <label htmlFor={`${id}-category`}>
          {t.contact.category}
          <select
            id={`${id}-category`}
            name="category"
            value={form.category}
            onChange={change}
          >
            {categories.map(([key, label]) => (
              <option value={key} key={key}>{label}</option>
            ))}
          </select>
        </label>
        {intent && (
          <label htmlFor={`${id}-timeline`}>
            {t.contact.timeline} <small>({t.contact.optional})</small>
            <input
              id={`${id}-timeline`}
              name="timeline"
              value={form.timeline}
              onChange={change}
              placeholder={t.contact.timelineHint}
              maxLength={160}
            />
          </label>
        )}
        <label htmlFor={`${id}-message`}>
          {t.contact.message} *
          <textarea
            id={`${id}-message`}
            name="message"
            value={form.message}
            onChange={change}
            placeholder={
              product ? t.contact.productPrompt : intent ? t.contact.partnerPrompt : t.contact.placeholder
            }
            required
            rows="4"
            maxLength={5000}
          />
        </label>
        <p className="form-note">
          {t.contact.consent} <a href={localizePath("/privacy", lang)}>{t.footer.privacy}</a>
        </p>
        <button
          type="submit"
          className="button primary"
          data-testid={product ? "product-inquiry-submit" : "contact-submit"}
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              {t.contact.sending}
            </>
          ) : (
            <>
              {t.contact.submit}
              <ArrowUpRight size={18} />
            </>
          )}
        </button>
      </fieldset>
      {result && (
        <div
          className={`form-result ${result === "success" ? "success" : "error"}`}
          role={result === "success" ? "status" : "alert"}
        >
          {t.contact[result]}
          {result === "error" && (
            <ContactAddressImage tone="dark" className="form-error-email" />
          )}
        </div>
      )}
    </form>
  );
}
