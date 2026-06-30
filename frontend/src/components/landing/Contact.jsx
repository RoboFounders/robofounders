import { useState } from "react";
import { Twitter, Linkedin, ArrowUpRight, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionLabel } from "./Reveal";
import { CONTACT } from "../../data/content";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and a short message.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", company: "", message: "" });
      toast.success("Request received — your Robot COO team will be in touch shortly.");
    }, 700);
  };

  const inputCls =
    "w-full rounded-xl border border-[#e4ecf2] bg-white px-4 py-3 text-[#0a0f1a] placeholder:text-[#9aa9b8] outline-none transition-all focus:border-[#4d6bff] focus:ring-2 focus:ring-[#4d6bff]/30";

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rf-radial-glow blur-2xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionLabel>Get Your Robot COO</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[#0a0f1a] sm:text-5xl">
            Build the future.{" "}
            <span className="rf-text-gradient">Go global.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#5b6b7e]">
            Tell us where you want to expand. We&apos;ll deploy AI, robotics and local human teams
            to handle the heavy lifting — performance-driven, founder-friendly.
          </p>

          <div className="mt-9 space-y-3">
            <a
              href={CONTACT.twitter}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-twitter"
              className="flex items-center gap-3 rounded-xl border border-[#e4ecf2] bg-white p-4 transition-all hover:border-[#b9c2ff] hover:rf-glow"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef1ff] text-[#4d6bff]">
                <Twitter className="h-5 w-5" />
              </span>
              <span className="text-base font-medium text-[#0a0f1a]">@maripto7 on X</span>
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-linkedin"
              className="flex items-center gap-3 rounded-xl border border-[#e4ecf2] bg-white p-4 transition-all hover:border-[#b9c2ff] hover:rf-glow"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef1ff] text-[#4d6bff]">
                <Linkedin className="h-5 w-5" />
              </span>
              <span className="text-base font-medium text-[#0a0f1a]">LinkedIn</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="rounded-3xl border border-[#e4ecf2] bg-[#f6f9fb] p-7 sm:p-9"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0a0f1a]">Name</label>
                <input
                  data-testid="contact-name"
                  className={inputCls}
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0a0f1a]">Email</label>
                <input
                  data-testid="contact-email-input"
                  type="email"
                  className={inputCls}
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-[#0a0f1a]">Company</label>
              <input
                data-testid="contact-company"
                className={inputCls}
                placeholder="Company / startup"
                value={form.company}
                onChange={update("company")}
              />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-[#0a0f1a]">
                Where do you want to expand?
              </label>
              <textarea
                data-testid="contact-message"
                rows={4}
                className={`${inputCls} resize-none`}
                placeholder="Tell us about your goals — markets, timeline, what you need on the ground..."
                value={form.message}
                onChange={update("message")}
              />
            </div>
            <button
              type="submit"
              data-testid="contact-submit"
              disabled={submitting}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full rf-cyan-gradient px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:rf-glow-strong hover:-translate-y-0.5 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Request your Robot COO"}
              {submitting ? (
                <Send className="h-4 w-4 animate-pulse" />
              ) : (
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
