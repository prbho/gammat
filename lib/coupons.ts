// lib/coupons.ts
/**
 * Single source of truth for coupon logic, shared by:
 *   - app/api/validate-coupon/route.ts  (client-facing check)
 *   - app/api/get-involved/route.ts     (server-side verification before emailing)
 *
 * Codes that grant free registration. In production, set COUPON_CODES
 * in your environment as a comma-separated list, e.g.:
 *   COUPON_CODES="GAMMATVIP,PARTNER2026,SPEAKERPASS"
 *
 * These fallback codes only apply when COUPON_CODES is unset, so local
 * development has something to test with.
 */
const FALLBACK_CODES = ["GAMMATFREE", "PARTNER2026"];

/**
 * Coupons are only valid on the Single package. This appears both as
 * the URL slug (id) and as the display name in the package list.
 */
export const COUPON_PACKAGE_ID = "single";
export const COUPON_PACKAGE_NAME = "Single Package";

export function getValidCodes(): string[] {
  const fromEnv = process.env.COUPON_CODES;
  const codes = fromEnv
    ? fromEnv
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : FALLBACK_CODES;
  return codes.map((c) => c.toUpperCase());
}

/**
 * True if the given code is a known coupon (case-insensitive).
 * Empty / whitespace-only strings return false.
 */
export function isValidCoupon(code: unknown): boolean {
  const normalized = String(code ?? "")
    .trim()
    .toUpperCase();
  if (!normalized) return false;
  return getValidCodes().includes(normalized);
}

/**
 * True if the given package identifier can be discounted by a coupon.
 * Accepts either the URL slug ("single") or the display name
 * ("Single Package"), so it works from both the client-facing route
 * and the email route.
 */
export function isCouponEligiblePackage(pkg: unknown): boolean {
  const normalized = String(pkg ?? "").trim();
  return normalized === COUPON_PACKAGE_ID || normalized === COUPON_PACKAGE_NAME;
}
