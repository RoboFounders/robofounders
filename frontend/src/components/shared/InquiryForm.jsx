import { useId, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contacts } from "@/content/media";
export default function InquiryForm({ product }) {
  const { t, lang } = useLanguage();
  const id = useId();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    category: "0",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");
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
          category: t.contact.categories[Number(form.category)],
          product: product?.name || "",
          language: lang,
          _subject: product
            ? `[RoboFounders Product Inquiry] ${product.name}`
            : "New inquiry from RoboFounders",
          _cc: contacts.cc,
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      if (data.success === false || data.success === "false")
        throw new Error("Submission rejected");
      setResult("success");
      setForm({ name: "", email: "", company: "", category: "0", message: "" });
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
        {!product && (
          <label htmlFor={`${id}-category`}>
            {t.contact.category}
            <select
              id={`${id}-category`}
              name="category"
              value={form.category}
              onChange={change}
            >
              {t.contact.categories.map((label, i) => (
                <option value={String(i)} key={i}>
                  {label}
                </option>
              ))}
            </select>
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
              product ? t.contact.productPrompt : t.contact.placeholder
            }
            required
            rows="4"
            maxLength={5000}
          />
        </label>
        <p className="form-note">
          {t.contact.consent} <a href="/privacy">{t.footer.privacy}</a>
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
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          )}
        </div>
      )}
    </form>
  );
}
