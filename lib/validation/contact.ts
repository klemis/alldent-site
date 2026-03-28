export const SUBJECTS = [
  "Rezerwacja wizyty",
  "Pytanie o usługę",
  "Pytanie o cennik",
  "Zmiana/odwołanie wizyty",
  "Inne",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website?: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.name = "Imię musi mieć od 2 do 50 znaków.";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Podaj prawidłowy adres email.";
  }

  if (data.phone && !/^\d{9}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Numer telefonu musi składać się z 9 cyfr.";
  }

  if (!data.subject || !SUBJECTS.includes(data.subject as Subject)) {
    errors.subject = "Wybierz temat wiadomości.";
  }

  if (!data.message || data.message.length < 10 || data.message.length > 1000) {
    errors.message = "Wiadomość musi mieć od 10 do 1000 znaków.";
  }

  return errors;
}
