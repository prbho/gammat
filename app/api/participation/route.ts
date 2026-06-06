import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ORGANISER_EMAIL =
  process.env.ORGANISER_EMAIL || "info@aspirewestafrica.com";
const FROM_EMAIL = process.env.FROM_EMAIL || ORGANISER_EMAIL;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const buildMessage = (data: Record<string, string | boolean>) => {
  const visibleFields = [
    ["Awardee name", data.awardeeName],
    ["Award category", data.awardCategory],
    ["Organization", data.organization],
    ["Contact person", data.contactPerson],
    ["Position", data.position],
    ["Industry sector", data.industrySector],
    ["Country", data.country],
    ["Official email", data.email],
    ["Phone", data.phone],
    ["Website", data.website],
    ["LinkedIn", data.linkedin],
    ["Instagram", data.instagram],
    ["Twitter", data.twitter],
    ["Accepted nomination", data.acceptedNomination ? "Yes" : "No"],
    ["Package choice", data.packageChoice],
    ["Media package", data.mediaPackage],
    ["Company profile link", data.profileLink],
    ["Spotlight session", data.spotlight ? "Yes" : "No"],
    ["Panel feature", data.panel ? "Yes" : "No"],
    ["Branded collateral", data.collateral ? "Yes" : "No"],
  ];

  return visibleFields
    .map(([label, value]) => `${label}: ${value || "Not provided"}`)
    .join("\n");
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const messageText = buildMessage(data);

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ORGANISER_EMAIL,
      subject: "GAMMAT 2026 Participation Request",
      text: messageText,
      html: `<pre style="font-family:inherit; white-space:pre-wrap;">${messageText}</pre>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Participation email send failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send participation request." },
      { status: 500 }
    );
  }
}
