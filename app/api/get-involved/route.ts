// app/api/get-involved/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  COUPON_PACKAGE_NAME,
  isValidCoupon,
  isCouponEligiblePackage,
} from "@/lib/coupons";

export const runtime = "nodejs";

const ORGANISER_EMAIL =
  process.env.ORGANISER_EMAIL || "info@aspirewestafrica.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "events@email.gammat.com.ng";

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  packageName?: string;
  budget?: string;
  inquiryType?: string;
  // ── Coupon / free registration (client-claimed, verified below) ──
  isFree?: boolean;
  couponCode?: string | null;
  amountPaidFormatted?: string;
}

const escapeHtml = (str: string) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildSubject = (data: InquiryData, isFree: boolean) => {
  if (isFree) {
    return `🎟 FREE ${data.inquiryType || "Registration"} — ${data.name}${
      data.packageName ? ` (${data.packageName})` : ""
    }${data.couponCode ? ` via ${data.couponCode}` : ""}`;
  }
  return `GAMMAT ${data.inquiryType || "Get Involved"} inquiry from ${
    data.name
  }`;
};

const buildText = (data: InquiryData, isFree: boolean) => {
  const lines: (string | null)[] = [];
  if (isFree) {
    lines.push(
      "*** FREE REGISTRATION ***",
      `This registration was completed at no cost${
        data.couponCode ? ` using coupon ${data.couponCode}` : ""
      }. No payment is expected.`,
      ""
    );
  }
  lines.push(
    `Inquiry Type: ${data.inquiryType || "General"}`,
    `Full Name: ${data.name}`,
    `Email Address: ${data.email}`,
    `Phone Number: ${data.phone || "Not provided"}`,
    `Company / Organisation: ${data.company || "Not provided"}`,
    data.packageName ? `Package: ${data.packageName}` : null,
    isFree
      ? "Amount: ₦0 (free via coupon)"
      : data.amountPaidFormatted
      ? `Amount: ${data.amountPaidFormatted}`
      : null,
    isFree && data.couponCode ? `Coupon Code: ${data.couponCode}` : null,
    data.budget ? `Budget Range: ${data.budget}` : null,
    "Message:",
    data.message
  );
  return lines.filter(Boolean).join("\n");
};

const buildHtml = (data: InquiryData, isFree: boolean) => {
  const banner = isFree
    ? `<div style="background:#eaf3de;border:1px solid #3B6D11;border-left:4px solid #3B6D11;padding:14px 16px;border-radius:8px;margin-bottom:20px;">
        <p style="margin:0 0 4px 0;font-weight:700;color:#3B6D11;font-size:15px;">
          🎟 FREE REGISTRATION
        </p>
        <p style="margin:0;color:#1a2b1a;font-size:14px;">
          This delegate registered at no cost${
            data.couponCode
              ? ` using coupon <strong>${escapeHtml(data.couponCode)}</strong>`
              : ""
          }. No payment is expected.
        </p>
      </div>`
    : "";

  const couponRow =
    isFree && data.couponCode
      ? `<tr style="border-bottom: 1px solid #e3e6df;">
          <td style="font-weight: 700; width: 180px; vertical-align: top;">Coupon Code</td>
          <td>${escapeHtml(data.couponCode)}</td>
        </tr>`
      : "";

  const amountRow = isFree
    ? `<tr style="border-bottom: 1px solid #e3e6df;">
        <td style="font-weight: 700; width: 180px; vertical-align: top;">Amount</td>
        <td>₦0 (free via coupon)</td>
      </tr>`
    : data.amountPaidFormatted
    ? `<tr style="border-bottom: 1px solid #e3e6df;">
        <td style="font-weight: 700; width: 180px; vertical-align: top;">Amount</td>
        <td>${escapeHtml(data.amountPaidFormatted)}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1a2b1a;">
    ${banner}
    <h2>${
      data.inquiryType ? `${escapeHtml(data.inquiryType)} Inquiry` : "Inquiry"
    }</h2>
    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; max-width: 680px; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Inquiry Type</td><td>${escapeHtml(
        data.inquiryType || "General"
      )}</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Full Name</td><td>${escapeHtml(
        data.name
      )}</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Email Address</td><td>${escapeHtml(
        data.email
      )}</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Phone Number</td><td>${escapeHtml(
        data.phone || "Not provided"
      )}</td></tr>
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Company / Organisation</td><td>${escapeHtml(
        data.company || "Not provided"
      )}</td></tr>
      ${
        data.packageName
          ? `<tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Package</td><td>${escapeHtml(
              data.packageName
            )}</td></tr>`
          : ""
      }
      ${amountRow}
      ${couponRow}
      ${
        data.budget
          ? `<tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Budget Range</td><td>${escapeHtml(
              data.budget
            )}</td></tr>`
          : ""
      }
      <tr style="border-bottom: 1px solid #e3e6df;"><td style="font-weight: 700; width: 180px; vertical-align: top;">Message</td><td>${escapeHtml(
        data.message
      ).replace(/\n/g, "<br />")}</td></tr>
    </table>
  </body>
</html>`;
};

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Resend is not configured. Please set RESEND_API_KEY.",
      },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const raw = (await request.json()) as InquiryData;

    /* ─────────────────────────────────────────────────────────
       Server-side coupon verification.
       Never trust `isFree` from the client. A legitimate client
       only sets it after /api/validate-coupon returned valid, but
       an attacker can POST directly to this route and claim it.
    ───────────────────────────────────────────────────────── */
    const clientClaimsFree = raw.isFree === true;

    if (clientClaimsFree) {
      const codeOk = isValidCoupon(raw.couponCode);
      const packageOk = isCouponEligiblePackage(raw.packageName);

      if (!codeOk) {
        return NextResponse.json(
          { success: false, error: "Invalid or expired coupon code." },
          { status: 400 }
        );
      }
      if (!packageOk) {
        return NextResponse.json(
          {
            success: false,
            error: `This coupon only applies to the ${COUPON_PACKAGE_NAME}.`,
          },
          { status: 400 }
        );
      }
    }

    // Sanitise the payload: only trust the free claim if it passed
    // the checks above. Otherwise force non-free fields so a missing
    // or malformed claim can't leak through to the email.
    const data: InquiryData = {
      ...raw,
      isFree: clientClaimsFree,
      couponCode: clientClaimsFree
        ? String(raw.couponCode ?? "")
            .trim()
            .toUpperCase() || null
        : null,
      amountPaidFormatted: clientClaimsFree
        ? "₦0 (free via coupon)"
        : raw.amountPaidFormatted,
    };

    const isFree = data.isFree === true;
    const text = buildText(data, isFree);
    const html = buildHtml(data, isFree);

    const { error } = await resend.emails.send({
      from: `GAMMAT 2026 <${FROM_EMAIL}>`,
      to: ORGANISER_EMAIL,
      replyTo: data.email || FROM_EMAIL,
      subject: buildSubject(data, isFree),
      text,
      html,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Get Involved email send failed:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send inquiry email.",
      },
      { status: 500 }
    );
  }
}
