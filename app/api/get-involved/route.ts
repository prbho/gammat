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

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const buildText = (data: InquiryData) =>
  [
    `Full Name: ${data.name}`,
    `Email Address: ${data.email}`,
    `Phone Number: ${data.phone || "Not provided"}`,
    `Company / Organisation: ${data.company || "Not provided"}`,
    "Message:",
    data.message,
  ].join("\n");

const buildHtml = (data: InquiryData) => `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1a2b1a;">
    <h2>Get Involved Inquiry</h2>
    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; max-width: 680px; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Full Name</td><td>${
        data.name
      }</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Email Address</td><td>${
        data.email
      }</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Phone Number</td><td>${
        data.phone || "Not provided"
      }</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Company / Organisation</td><td>${
        data.company || "Not provided"
      }</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Message</td><td>${data.message.replace(
        /\n/g,
        "<br />"
      )}</td></tr>
    </table>
  </body>
</html>`;

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
    const data = (await request.json()) as InquiryData;
    const text = buildText(data);
    const html = buildHtml(data);

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ORGANISER_EMAIL,
      subject: `GAMMAT Get Involved inquiry from ${data.name}`,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Get Involved email send failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send inquiry email." },
      { status: 500 }
    );
  }
}
