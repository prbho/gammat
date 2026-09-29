// app/api/validate-coupon/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * Codes that grant free registration on the Single package.
 *
 * In production, set COUPON_CODES in your environment as a
 * comma-separated list, e.g.:
 *   COUPON_CODES="GAMMATVIP,PARTNER2026,SPEAKERPASS"
 *
 * These fallback codes only apply when COUPON_CODES is unset,
 * so local development has something to test with.
 */
const FALLBACK_CODES = ["GAMMATFREE", "PARTNER2026"];

/**
 * Coupons are only valid on the Single package. Any other package
 * (Student, Bloc, etc.) is rejected with a clear message so the
 * client can surface it.
 */
const COUPON_PACKAGE = "single";

function getValidCodes(): string[] {
  const fromEnv = process.env.COUPON_CODES;
  const codes = fromEnv
    ? fromEnv
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : FALLBACK_CODES;
  return codes.map((c) => c.toUpperCase());
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { valid: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const code =
    typeof body === "object" && body && "code" in body
      ? String((body as { code: unknown }).code ?? "")
      : "";

  const packageId =
    typeof body === "object" && body && "packageId" in body
      ? String((body as { packageId: unknown }).packageId ?? "")
      : "";

  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return NextResponse.json(
      { valid: false, message: "Enter a coupon code." },
      { status: 400 }
    );
  }

  // This coupon is only valid for the Single package.
  if (packageId !== COUPON_PACKAGE) {
    return NextResponse.json({
      valid: false,
      message: "This coupon only applies to the Single Package.",
    });
  }

  const validCodes = getValidCodes();

  if (validCodes.includes(normalized)) {
    return NextResponse.json({ valid: true, freeRegistration: true });
  }

  // 200, not 404/401 — an unknown code is a normal outcome, not an error.
  return NextResponse.json({
    valid: false,
    message: "That coupon code isn't valid or has expired.",
  });
}
