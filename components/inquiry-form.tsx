"use client";

import type { FormEvent } from "react";
import { site } from "@/lib/site";

const fields = [
  { name: "names", label: "Your names", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "date", label: "Date, or an approximate one", type: "text", autoComplete: "off", required: true },
  { name: "place", label: "Where you are getting married", type: "text", autoComplete: "off", required: false },
] as const;

function inquiryEmail(form: FormData) {
  const value = (name: string) => String(form.get(name) ?? "").trim();
  const subject = `Wedding inquiry from ${value("names")}`;
  const body = [
    `Names: ${value("names")}`,
    `Email: ${value("email")}`,
    `Date: ${value("date")}`,
    `Place: ${value("place")}`,
    "",
    value("message"),
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "w-full border-b border-current bg-transparent py-2 font-display text-display-sm outline-offset-4";

export function InquiryForm() {
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = inquiryEmail(new FormData(event.currentTarget));
  };

  return (
    <form onSubmit={send} className="flex flex-col gap-8">
      {fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-1">
          <span>{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required={field.required}
            className={inputClass}
          />
        </label>
      ))}
      <label className="flex flex-col gap-1">
        <span>Tell me about the two of you</span>
        <textarea name="message" rows={5} required className={`${inputClass} resize-y`} />
      </label>
      <button type="submit" className="button-ink self-start">
        Send
      </button>
    </form>
  );
}
