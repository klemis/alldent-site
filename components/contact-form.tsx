"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const SUBJECTS = [
  "Rezerwacja wizyty",
  "Pytanie o usługę",
  "Pytanie o cennik",
  "Zmiana/odwołanie wizyty",
  "Inne",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (data.name.length < 2 || data.name.length > 50) {
    errors.name = "Imię musi mieć od 2 do 50 znaków.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Podaj prawidłowy adres email.";
  }

  if (data.phone && !/^\d{9}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Numer telefonu musi składać się z 9 cyfr.";
  }

  if (!SUBJECTS.includes(data.subject as (typeof SUBJECTS)[number])) {
    errors.subject = "Wybierz temat wiadomości.";
  }

  if (data.message.length < 10 || data.message.length > 1000) {
    errors.message = "Wiadomość musi mieć od 10 do 1000 znaków.";
  }

  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setStatus("error");
      } else {
        const data = await res.json();
        if (res.status === 400 && data.error) {
          setErrors({ name: data.error });
          setStatus("idle");
        } else {
          setStatus("error");
        }
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-card p-8 text-center">
        <CheckCircle className="size-12 text-primary" />
        <p className="text-lg font-medium text-foreground">
          Dziękujemy! Odpowiemy najszybciej jak to możliwe.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-card p-8 text-center">
        <AlertCircle className="size-12 text-destructive" />
        <p className="text-lg font-medium text-foreground">
          Przepraszamy, coś poszło nie tak.
        </p>
        <p className="text-muted-foreground">
          Zadzwoń do nas:{" "}
          <a
            href="tel:+48663333787"
            className="font-medium text-primary underline underline-offset-4"
          >
            +48 663 333 787
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={formData.website}
        onChange={handleChange}
        aria-hidden="true"
      />

      <div className="grid gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Imię <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={50}
          value={formData.name}
          onChange={handleChange}
          className="border border-input bg-background rounded-lg px-4 py-3 text-sm transition-shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="border border-input bg-background rounded-lg px-4 py-3 text-sm transition-shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium">
          Telefon
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="np. 123 456 789"
          className="border border-input bg-background rounded-lg px-4 py-3 text-sm transition-shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-destructive">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-subject" className="text-sm font-medium">
          Temat <span className="text-destructive">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="border border-input bg-background rounded-lg px-4 py-3 text-sm transition-shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none appearance-none"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        >
          <option value="">Wybierz temat...</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="text-sm text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Wiadomość <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="border border-input bg-background rounded-lg px-4 py-3 text-sm transition-shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-primary-foreground w-full py-3 rounded-lg font-medium text-sm transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          "Wyślij wiadomość"
        )}
      </button>
    </form>
  );
}
