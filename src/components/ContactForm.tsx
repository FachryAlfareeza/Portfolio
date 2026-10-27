"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      // honeypot: real users leave this empty
      company: String(data.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const fieldClass =
    "w-full rounded-sm2 border border-white/20 bg-white/5 px-3 py-[10px] text-[13px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-orange";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {/* Honeypot: visually hidden, off from tab order */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <label className="flex flex-col gap-1 text-[11px] font-bold tracking-[0.02em] text-white/70">
        Name
        <input name="name" type="text" required className={fieldClass} />
      </label>

      <label className="flex flex-col gap-1 text-[11px] font-bold tracking-[0.02em] text-white/70">
        Email
        <input name="email" type="email" required className={fieldClass} />
      </label>

      <label className="flex flex-col gap-1 text-[11px] font-bold tracking-[0.02em] text-white/70">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[47px] items-center justify-center rounded-sm2 bg-orange px-[18px] text-[12px] font-bold text-night-900 transition-[transform,background,opacity] duration-200 hover:-translate-y-0.5 hover:bg-orange-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="min-h-[18px] text-[11px]">
        {status === "sent" && (
          <span className="text-orange">Thanks, your message is on its way.</span>
        )}
        {status === "error" && (
          <span className="text-[#ff9b9b]">{error}</span>
        )}
      </p>
    </form>
  );
}
