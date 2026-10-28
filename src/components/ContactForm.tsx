"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 5000;
const REQUEST_TIMEOUT_MS = 15_000;

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "That email doesn't look right.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  else if (values.message.length > MESSAGE_MAX)
    errors.message = `Keep it under ${MESSAGE_MAX} characters.`;
  return errors;
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    // Client-side validation first: inline errors + focus the first bad field.
    const errors = validate(values);
    setFieldErrors(errors);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => errors[f]);
    if (firstInvalid) {
      setStatus("idle");
      setError("");
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setError("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `company` is the honeypot: real users leave it empty.
        body: JSON.stringify({ ...values, company: String(data.get("company") ?? "") }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }

      setStatus("sent");
      setMessageLength(0);
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof DOMException && err.name === "AbortError"
          ? "The request timed out."
          : err instanceof Error
            ? err.message
            : "Something went wrong."
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const fieldClass = (name: FieldName) =>
    `w-full rounded-sm2 border bg-white/5 px-3 py-[10px] text-[13px] text-white placeholder:text-white/40 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange ${
      fieldErrors[name] ? "border-[#ff9b9b]" : "border-white/20 focus:border-orange"
    }`;

  const labelClass = "flex flex-col gap-1 text-[12px] font-bold tracking-[0.02em] text-white/80";

  const fieldError = (name: FieldName) =>
    fieldErrors[name] ? (
      <span id={`${name}-error`} className="text-[12px] font-normal text-[#ffb4b4]">
        {fieldErrors[name]}
      </span>
    ) : null;

  const aria = (name: FieldName) => ({
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {/* Honeypot: visually hidden, off the tab order. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <label className={labelClass}>
        Name
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass("name")}
          {...aria("name")}
        />
        {fieldError("name")}
      </label>

      <label className={labelClass}>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass("email")}
          {...aria("email")}
        />
        {fieldError("email")}
      </label>

      <label className={labelClass}>
        <span className="flex items-baseline justify-between">
          Message
          <span
            className={`font-mono text-[12px] font-normal ${
              messageLength > MESSAGE_MAX ? "text-[#ffb4b4]" : "text-white/50"
            }`}
          >
            {messageLength}/{MESSAGE_MAX}
          </span>
        </span>
        <textarea
          name="message"
          required
          rows={4}
          onChange={(e) => setMessageLength(e.target.value.length)}
          className={`${fieldClass("message")} resize-y`}
          {...aria("message")}
        />
        {fieldError("message")}
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[47px] items-center justify-center rounded-sm2 bg-orange px-[18px] text-[12px] font-bold text-night-900 transition-[transform,background,opacity] duration-200 hover:-translate-y-0.5 hover:bg-orange-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="min-h-[18px] text-[12px]">
        {status === "sent" && (
          <span className="text-orange">Thanks, your message is on its way.</span>
        )}
        {status === "error" && (
          <span className="text-[#ffb4b4]">
            {error} You can also email{" "}
            <a className="underline underline-offset-2" href={`mailto:${fallbackEmail}`}>
              {fallbackEmail}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
