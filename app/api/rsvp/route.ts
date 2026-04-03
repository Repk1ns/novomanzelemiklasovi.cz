type RsvpPayload = {
  name?: string;
  attendance?: string;
  accommodation?: string;
  allergens?: string;
};

const attendanceLabels: Record<string, string> = {
  ano: "Dorazím",
  ne: "Nedorazím",
  upresnim: "Dám vědět později",
};

const accommodationLabels: Record<string, string> = {
  ne: "Ne, děkuji",
  ano: "Ano, mám zájem",
  mozna: "Možná, ještě upřesním",
};

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RSVP_FROM_EMAIL;
  const toEmail = process.env.RSVP_TO_EMAIL || "popelkajan77@gmail.com";

  if (!resendApiKey || !fromEmail) {
    return Response.json(
      {
        error:
          "Chybí konfigurace e-mailu. Doplňte RESEND_API_KEY a RSVP_FROM_EMAIL do .env.local.",
      },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as RsvpPayload;
  const name = payload.name?.trim();

  if (!name) {
    return Response.json(
      { error: "Vyplňte prosím jméno a příjmení." },
      { status: 400 },
    );
  }

  const attendance = attendanceLabels[payload.attendance || ""] ?? "Neuvedeno";
  const accommodation =
    accommodationLabels[payload.accommodation || ""] ?? "Neuvedeno";
  const allergens = payload.allergens?.trim() || "Bez poznámky";

  const text = [
    "Nové RSVP ze svatebního webu",
    "",
    `Jméno a příjmení: ${name}`,
    `Potvrzení účasti: ${attendance}`,
    `Zájem o ubytování: ${accommodation}`,
    `Alergeny a poznámky: ${allergens}`,
  ].join("\n");

  const html = `
    <div style="font-family: Georgia, serif; line-height: 1.7; color: #3a2a2a;">
      <h2 style="margin-bottom: 16px; color: #6f3340;">Nové RSVP ze svatebního webu</h2>
      <p><strong>Jméno a příjmení:</strong> ${escapeHtml(name)}</p>
      <p><strong>Potvrzení účasti:</strong> ${escapeHtml(attendance)}</p>
      <p><strong>Zájem o ubytování:</strong> ${escapeHtml(accommodation)}</p>
      <p><strong>Alergeny a poznámky:</strong><br />${escapeHtml(allergens).replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `RSVP - ${name}`,
      text,
      html,
      reply_to: toEmail,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();

    return Response.json(
      {
        error:
          "E-mail se nepodařilo odeslat. Zkontrolujte API klíč a ověřenou odesílací adresu v Resend.",
        details: errorText,
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
