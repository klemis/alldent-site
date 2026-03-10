import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const SUBJECTS = [
  "Rezerwacja wizyty",
  "Pytanie o usługę",
  "Pytanie o cennik",
  "Zmiana/odwołanie wizyty",
  "Inne",
];

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  website?: string;
}

function validatePayload(
  body: ContactPayload
): string | null {
  if (!body.name || body.name.length < 2 || body.name.length > 50) {
    return "Imię musi mieć od 2 do 50 znaków.";
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return "Podaj prawidłowy adres email.";
  }
  if (
    body.phone &&
    !/^\d{9}$/.test(body.phone.replace(/\s/g, ""))
  ) {
    return "Numer telefonu musi składać się z 9 cyfr.";
  }
  if (!body.subject || !SUBJECTS.includes(body.subject)) {
    return "Wybierz prawidłowy temat wiadomości.";
  }
  if (!body.message || body.message.length < 10 || body.message.length > 1000) {
    return "Wiadomość musi mieć od 10 do 1000 znaków.";
  }
  return null;
}

function buildEmailHtml(body: ContactPayload): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #0d9488; padding-bottom: 12px;">
        Nowa wiadomość z formularza kontaktowego
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #555; width: 120px; vertical-align: top;">Imię</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">${escapeHtml(body.name)}</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Email</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">
            <a href="mailto:${escapeHtml(body.email)}" style="color: #0d9488;">${escapeHtml(body.email)}</a>
          </td>
        </tr>
        ${body.phone ? `
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Telefon</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">
            <a href="tel:${escapeHtml(body.phone)}" style="color: #0d9488;">${escapeHtml(body.phone)}</a>
          </td>
        </tr>` : ""}
        <tr style="background: #f9fafb;">
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Temat</td>
          <td style="padding: 10px 12px; color: #1a1a1a;">${escapeHtml(body.subject)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Wiadomość</td>
          <td style="padding: 10px 12px; color: #1a1a1a; white-space: pre-wrap;">${escapeHtml(body.message)}</td>
        </tr>
      </table>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zbyt wiele wiadomości. Spróbuj ponownie za minutę." },
        { status: 429 }
      );
    }

    const body: ContactPayload = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const validationError = validatePayload(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await getResend().emails.send({
      from: "Formularz Alldent <onboarding@resend.dev>",
      to: "alldent@onet.eu",
      subject: `Nowa wiadomość: ${body.subject}`,
      html: buildEmailHtml(body),
      replyTo: body.email,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
