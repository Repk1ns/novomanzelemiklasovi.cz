type RsvpPayload = {
  name?: string;
  attendance?: string;
  attendanceLabel?: string;
  accommodation?: string;
  accommodationLabel?: string;
  allergens?: string;
};

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value || value === "..." || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function buildEmailContent(payload: Required<RsvpPayload>) {
  const allergens = payload.allergens || "Bez poznamek";

  const subject = `RSVP - ${payload.name}`;
  const textContent = [
    "Nova odpoved z RSVP formulare:",
    "",
    `Jmeno a prijmeni: ${payload.name}`,
    `Potvrzeni ucasti: ${payload.attendanceLabel}`,
    `Zajem o ubytovani: ${payload.accommodationLabel}`,
    `Alergeny a poznamky: ${allergens}`,
    "",
    `Technicka hodnota attendance: ${payload.attendance}`,
    `Technicka hodnota accommodation: ${payload.accommodation}`,
  ].join("\n");

  return { subject, textContent };
}

export async function POST(request: Request) {
  let payload: RsvpPayload;

  try {
    payload = (await request.json()) as RsvpPayload;
  } catch {
    return Response.json({ error: "Neplatna data formularu." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const attendance = payload.attendance?.trim();
  const attendanceLabel = payload.attendanceLabel?.trim();
  const accommodation = payload.accommodation?.trim();
  const accommodationLabel = payload.accommodationLabel?.trim();
  const allergens = payload.allergens?.trim() ?? "";

  if (!name || !attendance || !attendanceLabel || !accommodation || !accommodationLabel) {
    return Response.json(
      { error: "Formular nema vsechna povinna pole." },
      { status: 400 },
    );
  }

  let apiKey: string;
  let senderEmail: string;
  let senderName: string;
  let recipientEmail: string;

  try {
    apiKey = getRequiredEnv("BREVO_API_KEY");
    senderEmail = getRequiredEnv("BREVO_SENDER_EMAIL");
    senderName = getRequiredEnv("BREVO_SENDER_NAME");
    recipientEmail = getRequiredEnv("RSVP_RECIPIENT_EMAIL");
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Chybi konfigurace pro odesilani e-mailu.",
      },
      { status: 500 },
    );
  }

  const { subject, textContent } = buildEmailContent({
    name,
    attendance,
    attendanceLabel,
    accommodation,
    accommodationLabel,
    allergens,
  });

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [{ email: recipientEmail }],
      subject,
      textContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    return Response.json(
      {
        error: "Brevo odmitlo odeslani e-mailu.",
        details: errorText,
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
