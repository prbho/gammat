import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

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

interface ParticipationData {
  awardeeName: string;
  awardCategory: string;
  organization: string;
  contactPerson: string;
  position: string;
  industrySector: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  acceptedNomination: boolean;
  packageChoice: string;
  mediaPackage: string;
  profileLink: string;
  spotlight: boolean;
  panel: boolean;
  collateral: boolean;
}

const buildMessage = (data: ParticipationData) => {
  const rows = [
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

  return rows
    .map(([label, value]) => `${label}: ${value || "Not provided"}`)
    .join("\n");
};

const buildMessageHtml = (data: ParticipationData) => {
  const rows = [
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

  return `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1a2b1a;">
    <h2>GAMMAT 2026 Participation Request</h2>
    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; max-width: 680px; border-collapse: collapse;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">${label}</td><td>${
              value || "Not provided"
            }</td></tr>`
        )
        .join("")}
    </table>
  </body>
</html>`;
};

export async function POST(request: Request) {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASSWORD
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "SMTP is not configured. Please set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.",
      },
      { status: 500 }
    );
  }

  try {
    const data = (await request.json()) as ParticipationData;
    const messageText = buildMessage(data);
    const messageHtml = buildMessageHtml(data);

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ORGANISER_EMAIL,
      subject: `GAMMAT 2026 participation request: ${data.awardeeName}`,
      text: messageText,
      html: messageHtml,
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
