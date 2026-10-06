// app/register/page.tsx
"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  CheckCircle,
  ArrowRight,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Landmark,
  Copy,
  Check,
  Send,
  Building2,
  DollarSign,
  GraduationCap,
  BookOpen,
  AlertCircle,
  Ticket,
  PartyPopper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */

interface PaystackResponse {
  status: string;
  message: string;
  reference: string;
  trxref: string;
  transaction: string;
}

interface PaystackSetup {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  metadata?: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string | undefined;
    }>;
  };
  onSuccess: (response: PaystackResponse) => void;
  onCancel: () => void;
}

interface PaystackPop {
  setup: (config: PaystackSetup) => {
    openIframe: () => void;
  };
}

declare global {
  interface Window {
    PaystackPop?: PaystackPop;
  }
}

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  currencySymbol: string;
  sortCode?: string;
}

interface RegistrationPackage {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  usdPrice: string;
  icon: LucideIcon;
  benefits: string[];
  popular: boolean;
  isStudent?: boolean;
}

type Step = 1 | 2 | 3;
type CouponStatus = "idle" | "checking" | "valid" | "invalid";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  delegates: string;
  specialRequests: string;
  // Student-specific
  institution: string;
  studentId: string;
  level: string;
  course: string;
}

type FieldName = keyof FormState;
type FormErrors = Partial<Record<FieldName, string>>;

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */

const registrationPackages: RegistrationPackage[] = [
  {
    id: "student",
    name: "Student Package",
    price: 10000,
    priceFormatted: "₦10,000",
    usdPrice: "$8",
    icon: GraduationCap,
    benefits: [
      "Summit Access",
      "Student Networking Session",
      "Certificate of Attendance",
      "Single Student Pass",
      "Conference Materials",
      "Lunch & Refreshments",
      "Valid Student ID Required",
    ],
    popular: false,
    isStudent: true,
  },
  {
    id: "single",
    name: "Single Package",
    price: 30000,
    priceFormatted: "₦30,000",
    usdPrice: "$25",
    icon: User,
    benefits: [
      "Summit Access",
      "Networking Access",
      "Certificate of Attendance",
      "Single Delegate Pass",
      "Conference Materials",
      "Lunch & Refreshments",
    ],
    popular: false,
  },
  {
    id: "bloc",
    name: "Bloc Package",
    price: 200000,
    priceFormatted: "₦200,000",
    usdPrice: "$150",
    icon: Users,
    benefits: [
      "Summit Access",
      "Networking Access",
      "Certificate of Attendance",
      "10 Delegate Passes",
      "Conference Materials",
      "Lunch & Refreshments",
      "Group Discount Applied",
    ],
    popular: true,
  },
];

const bankAccounts: BankAccount[] = [
  {
    id: "ngn-zenith",
    bankName: "Zenith Bank",
    accountName: "Intra-Costal Communication Ltd",
    accountNumber: "1311930150",
    currency: "NGN",
    currencySymbol: "₦",
  },
  {
    id: "ngn-fidelity",
    bankName: "Fidelity Bank",
    accountName: "INTRA - COSTAL COMMUNICATIONS LTD",
    accountNumber: "5080254915",
    currency: "NGN",
    currencySymbol: "₦",
  },
  {
    id: "usd-fidelity",
    bankName: "Fidelity Bank (USD)",
    accountName: "Intra - Costal Communications Ltd",
    accountNumber: "5240091000",
    currency: "USD",
    currencySymbol: "$",
  },
];

const LEVELS = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "600 Level",
  "Postgraduate",
  "PhD",
];

const emailForReceipt = "info@aspirewestafrica.com";
const DEFAULT_PACKAGE = "student";
const COUPON_PACKAGE = "single";
const STORAGE_KEY = "gammat-2026-register-form";
const COUPON_STORAGE_KEY = "gammat-2026-register-coupon";

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  position: "",
  delegates: "",
  specialRequests: "",
  institution: "",
  studentId: "",
  level: "",
  course: "",
};

// Order used to focus the first invalid field.
const FIELD_ORDER: FieldName[] = [
  "fullName",
  "email",
  "phone",
  "institution",
  "studentId",
  "organization",
  "delegates",
];

/* ─────────────────────────────────────────────────────────────
   URL helpers
     step 1 → /register?student&step=package
     step 2 → /register?student
     step 3 → /register?student&step=payment
     coupon → /register?single&coupon=CODE[&step=payment]
───────────────────────────────────────────────────────────── */

const buildUrl = (step: Step, pkg: string, coupon?: string | null): string => {
  const parts: string[] = [pkg];
  if (coupon) parts.push(`coupon=${encodeURIComponent(coupon)}`);
  if (step === 1) parts.push("step=package");
  else if (step === 3) parts.push("step=payment");
  return `/register?${parts.join("&")}`;
};

/* ─────────────────────────────────────────────────────────────
   Validation
───────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (data: FormState, packageId: string): FormErrors => {
  const errors: FormErrors = {};
  const isStudent = packageId === "student";

  if (data.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  } else if (!data.fullName.trim().includes(" ")) {
    errors.fullName = "Enter your first and last name.";
  }

  if (!data.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    /[^\d+\s()-]/.test(data.phone)
  ) {
    errors.phone = "Enter a valid phone number, like +234 801 234 5678.";
  }

  if (isStudent) {
    if (!data.institution.trim()) {
      errors.institution = "Enter your institution.";
    }
    if (!data.studentId.trim()) {
      errors.studentId = "Enter your student ID or matric number.";
    }
  } else {
    if (!data.organization.trim()) {
      errors.organization = "Enter your organization.";
    }
    if (packageId === "bloc" && !data.delegates) {
      errors.delegates = "Choose how many delegates you are registering.";
    }
  }

  return errors;
};

/* ─────────────────────────────────────────────────────────────
   Small presentational components
   (defined OUTSIDE the page component so inputs never remount
   and lose focus while typing)
───────────────────────────────────────────────────────────── */

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-2.5 bg-white border rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:ring-2 text-sm transition-colors ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-[#d4d8d0] focus:border-[#3B6D11] focus:ring-[#3B6D11]/20"
  }`;

function FieldShell({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#1a2b1a] mb-1.5"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
        {optional && (
          <span className="text-[#4a5a4a]/60 font-normal"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-[#4a5a4a]/70 mt-1.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function TextField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  optional,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  autoFocus,
}: {
  name: FieldName;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (name: FieldName) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoFocus?: boolean;
}) {
  return (
    <FieldShell
      id={name}
      label={label}
      required={required}
      optional={optional}
      error={error}
      hint={hint}
    >
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        autoFocus={autoFocus}
        autoCapitalize={type === "email" ? "none" : undefined}
        spellCheck={type === "email" ? false : undefined}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${name}-error` : hint ? `${name}-hint` : undefined
        }
        className={inputClass(!!error)}
      />
    </FieldShell>
  );
}

function SelectField({
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  error,
  hint,
  required,
  optional,
}: {
  name: FieldName;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (name: FieldName, value: string | null) => void;
  onBlur: (name: FieldName) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <FieldShell
      id={name}
      label={label}
      required={required}
      optional={optional}
      error={error}
      hint={hint}
    >
      <Select
        value={value}
        onValueChange={(v) => onChange(name, v)}
        onOpenChange={(open) => {
          if (!open) onBlur(name);
        }}
      >
        <SelectTrigger
          id={name}
          className={`w-full ${error ? "border-red-400" : ""}`}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

function SummaryBar({
  name,
  price,
  isFree,
  couponCode,
  onChange,
}: {
  name?: string;
  price?: string;
  isFree?: boolean;
  couponCode?: string | null;
  onChange?: () => void;
}) {
  return (
    <div className="mb-6 pb-6 border-b border-[#d4d8d0]">
      <div className="flex justify-between items-center gap-4">
        <div>
          <p className="text-xs text-[#4a5a4a]/70 mb-1">Selected Package</p>
          <p className="text-lg font-bold text-[#1a2b1a]">{name}</p>
          {onChange && (
            <button
              type="button"
              onClick={onChange}
              className="text-xs font-semibold text-[#3B6D11] hover:underline mt-1"
            >
              Change package
            </button>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-[#4a5a4a]/70 mb-1">Total Amount</p>
          {isFree ? (
            <>
              <p className="text-xs text-[#4a5a4a]/50 line-through">{price}</p>
              <p className="text-xl font-bold text-[#3B6D11]">FREE</p>
              {couponCode && (
                <p className="text-[11px] text-[#3B6D11]/70 mt-0.5">
                  via {couponCode}
                </p>
              )}
            </>
          ) : (
            <p className="text-xl font-bold text-[#3B6D11]">{price}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-4"
    >
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Outer wrapper: keeps useSearchParams isolated behind a Suspense
   boundary so the page can still be statically prerendered.
───────────────────────────────────────────────────────────── */
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterFallback() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm text-[#4a5a4a]">Loading registration…</p>
      </div>
    </div>
  );
}

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* ── Resolve package + step from the URL ───────────────────
     /register?package=student  → explicit
     /register?student          → shorthand
     /register?coupon=CODE      → implies Single package
     step=1 | package           → package selection
     step=2 | details           → details form
     step=3 | payment           → payment
  ─────────────────────────────────────────────────────────── */
  const urlPackage = useMemo<string | null>(() => {
    const direct = searchParams.get("package");
    if (direct && registrationPackages.some((p) => p.id === direct)) {
      return direct;
    }
    const shorthand = registrationPackages.find((p) => searchParams.has(p.id));
    if (shorthand) return shorthand.id;
    // A coupon in the URL implies the Single package.
    if (searchParams.has("coupon")) return COUPON_PACKAGE;
    return null;
  }, [searchParams]);

  const urlStep = useMemo<Step | null>(() => {
    const s = searchParams.get("step");
    if (s === "1" || s === "package") return 1;
    if (s === "2" || s === "details") return 2;
    if (s === "3" || s === "payment") return 3;
    return null;
  }, [searchParams]);

  const urlCoupon = useMemo<string | null>(() => {
    const c = searchParams.get("coupon");
    return c ? c.trim().toUpperCase() : null;
  }, [searchParams]);

  // The step is derived from the URL, so the browser back/forward
  // buttons always match what is on screen.
  const step: Step = urlStep ?? (urlPackage ? 2 : 1);

  // The selected package is derived from the URL — no local state needed.
  // Clicking a package card updates the URL, which in turn updates this.
  const selectedPackage = urlPackage ?? DEFAULT_PACKAGE;

  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | null
  >(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>(
    bankAccounts[0].id
  );
  const [copiedAccountId, setCopiedAccountId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paystackReady, setPaystackReady] = useState(false);
  const [paystackFailed, setPaystackFailed] = useState(false);

  // ── Coupon code (only valid on the Single package) ──
  const [couponInput, setCouponInput] = useState("");
  const [showCouponField, setShowCouponField] = useState(false);
  const [couponStatus, setCouponStatus] = useState<CouponStatus>("idle");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // The coupon only counts when the Single package is selected.
  const isFree = !!appliedCoupon && selectedPackage === COUPON_PACKAGE;

  const stepperRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const selectedPackageData = registrationPackages.find(
    (p) => p.id === selectedPackage
  );
  const isStudent = selectedPackageData?.isStudent === true;
  const selectedBank = bankAccounts.find((b) => b.id === selectedBankAccount);

  const errors = useMemo(
    () => validate(formData, selectedPackage),
    [formData, selectedPackage]
  );
  const hasErrors = Object.keys(errors).length > 0;

  // Only show an error once the person has left the field
  // (or tried to continue).
  const errorFor = (name: FieldName) =>
    touched[name] || attemptedSubmit ? errors[name] : undefined;

  /* ── Navigation ─────────────────────────────────────────── */

  // Navigating to a non-payment step always resets the payment UI.
  // If the target package isn't the coupon-eligible one, the coupon
  // is stripped from the URL (but kept in state until we navigate).
  const goToStep = useCallback(
    (
      nextStep: Step,
      pkg: string,
      mode: "push" | "replace" = "push",
      couponOverride?: string | null
    ) => {
      if (nextStep !== 3) {
        setPaymentMethod(null);
        setPaymentError(null);
      }
      const couponToUse =
        couponOverride !== undefined
          ? couponOverride
          : pkg === COUPON_PACKAGE
          ? appliedCoupon
          : null;
      const url = buildUrl(nextStep, pkg, couponToUse);
      if (mode === "replace") router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    },
    [router, appliedCoupon]
  );

  // Scroll to the top of the form whenever the step changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  /* ── Remember the form + coupon (refresh, back button) ── */

  useEffect(() => {
    // One-time hydration from sessionStorage. sessionStorage has no
    // subscription API, so the "subscribe and setState in a callback"
    // pattern this rule expects doesn't apply. Reading it once on
    // mount is the correct pattern for restoring a saved draft.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        return saved ? { ...EMPTY_FORM, ...JSON.parse(saved) } : prev;
      } catch {
        return prev;
      }
    });
    try {
      const savedCoupon = sessionStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData, hydrated, submitted]);

  useEffect(() => {
    if (!hydrated || submitted) return;
    try {
      if (appliedCoupon) {
        sessionStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        sessionStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon, hydrated, submitted]);

  // Someone landing on ?step=payment with an incomplete form
  // goes back to the details step instead of paying with empty data.
  useEffect(() => {
    if (!hydrated || submitted) return;
    if (step === 3 && hasErrors) {
      // Legitimate navigation side-effect: we redirect the user back
      // to step 2 and mark the form as attempted so the field errors
      // render visibly once they arrive.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAttemptedSubmit(true);
      goToStep(2, selectedPackage, "replace");
    }
  }, [hydrated, submitted, step, hasErrors, selectedPackage, goToStep]);

  // If the selected package ever changes away from Single while a
  // coupon is applied (e.g. via the browser back/forward buttons),
  // drop the coupon — it no longer applies.
  useEffect(() => {
    if (selectedPackage !== COUPON_PACKAGE && appliedCoupon) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedCoupon(null);
      setCouponStatus("idle");
      setCouponError(null);
      setShowCouponField(false);
      setCouponInput("");
    }
  }, [selectedPackage, appliedCoupon]);

  /* ── Auto-validate a coupon that arrived via the URL ──
     Visiting /register?coupon=GAMMATFREE lands the user on the
     Single package, at the details step, with the coupon applied
     as soon as the server confirms it. Every setState here runs
     after an await, so the effect body has no synchronous setState. */
  useEffect(() => {
    if (!hydrated || submitted) return;
    if (!urlCoupon) return;
    if (selectedPackage !== COUPON_PACKAGE) return;
    if (appliedCoupon === urlCoupon) return;

    const controller = new AbortController();
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/validate-coupon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: urlCoupon,
            packageId: selectedPackage,
          }),
          signal: controller.signal,
        });
        const result = await response.json();
        if (cancelled) return;

        if (response.ok && result.valid) {
          setAppliedCoupon(urlCoupon);
          setCouponStatus("valid");
          setCouponError(null);
        } else {
          setCouponStatus("invalid");
          setCouponError(
            result.message || "That coupon code isn't valid or has expired."
          );
          setCouponInput(urlCoupon);
          setShowCouponField(true);
        }
      } catch (err) {
        if (cancelled) return;
        if ((err as Error).name === "AbortError") return;
        setCouponStatus("invalid");
        setCouponError(
          "Couldn't check that code. Check your connection and try again."
        );
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [urlCoupon, appliedCoupon, hydrated, submitted, selectedPackage]);

  /* ── Paystack script ────────────────────────────────────── */

  useEffect(() => {
    const src = "https://js.paystack.co/v1/inline.js";
    const onLoad = () => {
      setPaystackReady(true);
      setPaystackFailed(false);
    };
    const onError = () => setPaystackFailed(true);

    if (window.PaystackPop) {
      onLoad();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);

    return () => {
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
    };
  }, []);

  /* ── Analytics ──────────────────────────────────────────── */

  const trackGoogleAdsConversion = () => {
    if (typeof window === "undefined") return;

    const gtag = (
      window as Window &
        typeof globalThis & {
          gtag?: (...args: unknown[]) => void;
        }
    ).gtag;

    gtag?.("event", "conversion", {
      send_to: ["AW-18453740960/MxeiCI-Lx_4cEKD7tt9E"],
    });
  };

  /* ── Form handlers ──────────────────────────────────────── */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // shadcn Select uses onValueChange instead of a change event
  const handleSelectChange = (name: FieldName, value: string | null) => {
    setFormData((prev) => ({ ...prev, [name]: value ?? "" }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  };

  // Selecting a package replaces the URL so the choice is shareable
  // and the browser back button works as expected.
  const handleSelectPackage = (id: string) => {
    goToStep(1, id, "replace");
  };

  const handleNext = () => {
    goToStep(2, selectedPackage);
  };

  const handleBack = () => {
    if (step === 2) {
      goToStep(1, selectedPackage);
    } else if (step === 3) {
      goToStep(2, selectedPackage);
    }
  };

  const handleProceedToPayment = (e?: React.FormEvent) => {
    e?.preventDefault();
    setAttemptedSubmit(true);

    if (hasErrors) {
      const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
      if (firstInvalid) {
        const el = document.getElementById(firstInvalid);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }
      return;
    }

    goToStep(3, selectedPackage);
  };

  const handleCopyAccountNumber = async (
    accountNumber: string,
    accountId: string
  ) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccountId(accountId);
      setTimeout(() => setCopiedAccountId(null), 2000);
    } catch {
      setPaymentError(
        "Could not copy the account number. Please copy it manually."
      );
    }
  };

  const handleReset = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(COUPON_STORAGE_KEY);
    } catch {
      // ignore
    }
    setSubmitted(false);
    setConfirmationEmailSent(false);
    setPaymentMethod(null);
    setPaymentError(null);
    setTouched({});
    setAttemptedSubmit(false);
    setFormData(EMPTY_FORM);
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponStatus("idle");
    setCouponError(null);
    setShowCouponField(false);
    // Navigating to /register clears urlPackage and urlCoupon, so
    // `selectedPackage` falls back to DEFAULT_PACKAGE.
    router.push("/register", { scroll: false });
  };

  /* ── Coupon handlers ────────────────────────────────────── */

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponStatus("invalid");
      setCouponError("Enter a coupon code.");
      return;
    }

    setCouponStatus("checking");
    setCouponError(null);

    try {
      const response = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, packageId: selectedPackage }),
      });
      const result = await response.json();

      if (response.ok && result.valid) {
        setAppliedCoupon(code);
        setCouponStatus("valid");
        setShowCouponField(false);
        setCouponInput("");
        // Reflect the coupon in the URL so it's shareable.
        router.replace(buildUrl(step, selectedPackage, code), {
          scroll: false,
        });
      } else {
        setCouponStatus("invalid");
        setCouponError(result.message || "That coupon code isn't valid.");
      }
    } catch {
      setCouponStatus("invalid");
      setCouponError(
        "Couldn't check that code. Check your connection and try again."
      );
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponStatus("idle");
    setCouponError(null);
    setShowCouponField(false);
    setPaymentMethod(null);
    setPaymentError(null);
    // Strip the coupon param from the URL.
    router.replace(buildUrl(step, selectedPackage, null), { scroll: false });
  };

  /* ── Submission ─────────────────────────────────────────── */

  const sendRegistrationInquiry = async () => {
    const studentDetails = isStudent
      ? `\nInstitution: ${formData.institution.trim()}\nStudent ID / Matric No: ${formData.studentId.trim()}\nLevel / Year: ${
          formData.level || "N/A"
        }\nCourse of Study: ${formData.course.trim() || "N/A"}`
      : "";

    const couponDetails = appliedCoupon
      ? `\nCoupon Code: ${appliedCoupon}\nAmount Paid: ₦0 (free via coupon)`
      : "";

    // Human-readable amount for the email
    const amountPaidFormatted = isFree
      ? "₦0 (free via coupon)"
      : selectedPackageData?.priceFormatted ?? "N/A";

    const response = await fetch("/api/get-involved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: isStudent
          ? formData.institution.trim()
          : formData.organization.trim(),
        packageName: selectedPackageData?.name,
        inquiryType: isStudent ? "Student Registration" : "Registration",
        paymentMethod: isFree ? "coupon" : paymentMethod ?? "",
        // ── New explicit fields so the email layer can highlight free regs ──
        isFree,
        couponCode: appliedCoupon,
        amountPaidFormatted,
        message: `Registration details:\nPackage: ${
          selectedPackageData?.name
        }\nPrice: ${selectedPackageData?.priceFormatted}\nUSD Price: ${
          selectedPackageData?.usdPrice
        }\nPayment Method: ${
          isFree ? "Coupon (Free)" : paymentMethod ?? "Not selected"
        }\nDelegates: ${formData.delegates || "N/A"}\nPosition/Title: ${
          formData.position.trim() || "N/A"
        }${studentDetails}${couponDetails}\nSpecial Requests: ${
          formData.specialRequests.trim() || "None"
        }`,
      }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to send registration inquiry.");
    }
    return result.confirmationEmailSent === true;
  };

  const handlePayWithPaystack = () => {
    setPaymentError(null);

    if (!paystackReady || !window.PaystackPop) {
      setPaymentError(
        "The payment window is still loading. Please try again in a moment."
      );
      return;
    }

    const nameParts = formData.fullName.trim().split(/\s+/);

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      email: formData.email.trim(),
      // Paystack expects the amount in kobo (₦1 = 100 kobo)
      amount: (selectedPackageData?.price || 0) * 100,
      currency: "NGN",
      ref: `GAMMAT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      firstname: nameParts[0],
      lastname: nameParts.slice(1).join(" "),
      phone: formData.phone.trim(),
      metadata: {
        custom_fields: [
          {
            display_name: "Package",
            variable_name: "package",
            value: selectedPackageData?.name,
          },
          {
            display_name: isStudent ? "Institution" : "Organization",
            variable_name: isStudent ? "institution" : "organization",
            value: isStudent
              ? formData.institution.trim()
              : formData.organization.trim(),
          },
          ...(isStudent
            ? [
                {
                  display_name: "Student ID",
                  variable_name: "student_id",
                  value: formData.studentId.trim(),
                },
                {
                  display_name: "Level",
                  variable_name: "level",
                  value: formData.level || "N/A",
                },
              ]
            : []),
        ],
      },
      onSuccess: async () => {
        setIsSubmitting(true);
        try {
          const confirmationEmailSent = await sendRegistrationInquiry();
          setConfirmationEmailSent(confirmationEmailSent);
          setSubmitted(true);
          try {
            sessionStorage.removeItem(STORAGE_KEY);
          } catch {
            // ignore
          }
          trackGoogleAdsConversion();
        } catch (error) {
          console.error("Registration email send failed:", error);
          setPaymentError(
            "Your payment succeeded, but we couldn't send your registration details. Please contact us so we can confirm your registration."
          );
        } finally {
          setIsSubmitting(false);
        }
      },
      onCancel: () => {
        console.log("Payment cancelled");
      },
    });
    handler.openIframe();
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setPaymentError(null);
    setIsSubmitting(true);

    try {
      const confirmationEmailSent = await sendRegistrationInquiry();
      setConfirmationEmailSent(confirmationEmailSent);
      setSubmitted(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      trackGoogleAdsConversion();
    } catch (error) {
      console.error("Error submitting registration transfer:", error);
      setPaymentError(
        "We couldn't send your registration details. Check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Free registration — no payment step, just confirm and send.
  const handleFreeSubmit = async () => {
    if (isSubmitting) return;
    setPaymentError(null);
    setIsSubmitting(true);

    try {
      const confirmationEmailSent = await sendRegistrationInquiry();
      setConfirmationEmailSent(confirmationEmailSent);
      setSubmitted(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(COUPON_STORAGE_KEY);
      } catch {
        // ignore
      }
      trackGoogleAdsConversion();
    } catch (error) {
      console.error("Error submitting free registration:", error);
      setPaymentError(
        "We couldn't complete your free registration. Check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Stepper ────────────────────────────────────────────── */

  const steps: { n: Step; label: string }[] = [
    { n: 1, label: "Select Package" },
    { n: 2, label: "Your Details" },
    { n: 3, label: isFree ? "Confirm" : "Payment" },
  ];

  /* ─────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      {/* ── Hero ── */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Early Bird Registration
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Register for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GAMMAT 2026
            </span>
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Secure your seat at Africa&apos;s premier transport leadership
            platform.
          </p>
        </div>
      </section>

      {/* ── Steps Indicator ── */}
      <section ref={stepperRef} className="px-6 mb-12 scroll-mt-28">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((s, i) => {
              const reached = step >= s.n;
              // Only earlier steps are clickable; going forward needs
              // the form to be validated first.
              const clickable = !submitted && s.n < step;
              const content = (
                <>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      reached
                        ? "bg-[#3B6D11] text-white"
                        : "bg-[#d4d8d0] text-[#4a5a4a]"
                    }`}
                  >
                    {reached && s.n < step ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      s.n
                    )}
                  </span>
                  <span
                    className={`hidden sm:inline text-sm font-medium ${
                      reached ? "text-[#1a2b1a]" : "text-[#4a5a4a]/50"
                    }`}
                  >
                    {s.label}
                  </span>
                </>
              );

              return (
                <li key={s.n} className="flex items-center gap-2 sm:gap-4">
                  {clickable ? (
                    <button
                      type="button"
                      onClick={() => goToStep(s.n, selectedPackage)}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      aria-label={`Go back to ${s.label}`}
                    >
                      {content}
                    </button>
                  ) : (
                    <div
                      className="flex items-center gap-2"
                      aria-current={step === s.n ? "step" : undefined}
                    >
                      {content}
                    </div>
                  )}
                  {i < steps.length - 1 && (
                    <span className="w-6 sm:w-12 h-0.5 bg-[#d4d8d0]" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {submitted ? (
          <div className="bg-[#eaf3de] border border-[#3B6D11]/30 rounded-xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-[#3B6D11] mx-auto mb-4" />
            <h3 className="text-2xl font-black text-[#1a2b1a] mb-2">
              Registration Successful!
            </h3>
            <p className="text-[#4a5a4a] mb-4">
              {confirmationEmailSent
                ? `A confirmation email has been sent to ${formData.email}.`
                : "Your registration details were received, but we couldn't send the confirmation email. Please contact info@aspirewestafrica.com."}
            </p>

            {isFree && (
              <div className="bg-white rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-[#3B6D11] font-semibold mb-2 flex items-center gap-2">
                  <PartyPopper className="w-4 h-4" />
                  Free Registration
                </p>
                <p className="text-sm text-[#4a5a4a]">
                  Your registration was completed at no cost using the coupon{" "}
                  <strong className="text-[#1a2b1a]">{appliedCoupon}</strong>.
                </p>
              </div>
            )}

            {isStudent && (
              <div className="bg-white rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-[#1a70c8] font-semibold mb-2">
                  🎓 Student Verification:
                </p>
                <p className="text-sm text-[#4a5a4a]">
                  Your student rate is subject to verification. Please email a
                  clear copy of your valid student ID or matriculation document
                  to{" "}
                  <strong className="text-[#1a2b1a]">{emailForReceipt}</strong>{" "}
                  with the subject{" "}
                  <strong>
                    &quot;GAMMAT 2026 Student Verification - {formData.fullName}
                    &quot;
                  </strong>
                  . Registrations that cannot be verified may be upgraded to the
                  standard rate.
                </p>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-[#3B6D11] font-semibold mb-2">
                  ⚠️ Important:
                </p>
                <p className="text-sm text-[#4a5a4a]">
                  Your registration will be confirmed once your payment is
                  verified. Please send your payment receipt to{" "}
                  <strong className="text-[#1a2b1a]">{emailForReceipt}</strong>{" "}
                  for swift confirmation.
                </p>
              </div>
            )}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
            >
              Register Another
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            {/* ───────── Step 1: Select Package ───────── */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {registrationPackages.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => handleSelectPackage(pkg.id)}
                      aria-pressed={selectedPackage === pkg.id}
                      className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? "border-[#3B6D11] bg-[#eaf3de] ring-1 ring-[#3B6D11]/20"
                          : "border-[#d4d8d0] bg-white hover:border-[#3B6D11]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 p-2 rounded-md bg-[#eaf3de] flex items-center justify-center">
                              <pkg.icon className="w-8 h-8 text-[#3B6D11]" />
                            </div>
                            <h4 className="text-xl font-bold text-[#1a2b1a]">
                              {pkg.name}
                            </h4>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {pkg.popular && (
                              <span className="inline-block text-[10px] font-bold bg-[#3B6D11] text-white px-2 py-0.5 rounded-md">
                                Most Popular
                              </span>
                            )}
                            {pkg.isStudent && (
                              <span className="inline-block text-[10px] font-bold bg-[#1a70c8] text-white px-2 py-0.5 rounded-md">
                                Student Rate
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#3B6D11]">
                            {pkg.priceFormatted}
                          </div>
                          <div className="text-xs text-[#4a5a4a]/50">
                            {pkg.usdPrice}
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-4">
                        {pkg.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-[#4a5a4a]"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-[#3B6D11] shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                {isStudent && (
                  <div className="flex items-start gap-3 bg-[#eaf0fa] border border-[#1a70c8]/20 rounded-xl p-4">
                    <BookOpen className="w-5 h-5 text-[#1a70c8] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#4a5a4a]">
                      The student rate is available to full-time undergraduate
                      and postgraduate students. You will be asked for your
                      institution and student ID / matric number, and a copy of
                      your valid student ID must be emailed to{" "}
                      <strong className="text-[#1a2b1a]">
                        {emailForReceipt}
                      </strong>{" "}
                      after registration.
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
                  >
                    Continue with {selectedPackageData?.name}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ───────── Step 2: Registration Form ───────── */}
            {step === 2 && (
              <form
                onSubmit={handleProceedToPayment}
                noValidate
                className="space-y-6"
              >
                <div className="bg-white border border-[#d4d8d0] rounded-xl p-4 sm:p-6">
                  <SummaryBar
                    name={selectedPackageData?.name}
                    price={selectedPackageData?.priceFormatted}
                    isFree={isFree}
                    couponCode={appliedCoupon}
                    onChange={() => goToStep(1, selectedPackage)}
                  />

                  {/* ── Coupon code ── */}
                  <div className="mb-6">
                    {isFree ? (
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-[#3B6D11]/30 bg-[#eaf3de] px-4 py-3">
                        <p className="text-sm text-[#1a2b1a] flex items-center gap-2">
                          <Ticket className="w-4 h-4 text-[#3B6D11] shrink-0" />
                          Coupon <strong>{appliedCoupon}</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs font-semibold text-[#3B6D11] hover:underline shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ) : showCouponField ? (
                      <div className="rounded-lg border border-[#d4d8d0] bg-[#f7f6f2] p-4">
                        <label
                          htmlFor="couponCode"
                          className="block text-sm font-medium text-[#1a2b1a] mb-2"
                        >
                          Coupon Code
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            id="couponCode"
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value);
                              if (couponStatus === "invalid") {
                                setCouponStatus("idle");
                                setCouponError(null);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleApplyCoupon();
                              }
                            }}
                            placeholder="e.g. GAMMATFREE"
                            autoCapitalize="characters"
                            aria-invalid={couponStatus === "invalid"}
                            aria-describedby={
                              couponError ? "coupon-error" : undefined
                            }
                            className={inputClass(couponStatus === "invalid")}
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={couponStatus === "checking"}
                            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold text-white hover:bg-[#3a8a3b] transition-colors disabled:opacity-50 shrink-0"
                          >
                            {couponStatus === "checking"
                              ? "Checking..."
                              : "Apply"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCouponField(false);
                              setCouponInput("");
                              setCouponStatus("idle");
                              setCouponError(null);
                            }}
                            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-[#4a5a4a] hover:text-[#1a2b1a]"
                          >
                            Cancel
                          </button>
                        </div>
                        {couponError && (
                          <p
                            id="coupon-error"
                            role="alert"
                            className="flex items-center gap-1.5 text-xs text-red-600 mt-2"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {couponError}
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowCouponField(true)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B6D11] hover:underline"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        Have a coupon code?
                      </button>
                    )}
                  </div>

                  <h2
                    className="text-xl font-black text-[#1a2b1a] mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {isStudent ? "Student Information" : "Your Information"}
                  </h2>
                  <p className="text-xs text-[#4a5a4a]/70 mb-6">
                    Fields marked <span className="text-red-600">*</span> are
                    required.
                  </p>

                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-5">
                    <TextField
                      name="fullName"
                      label="Full Name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errorFor("fullName")}
                      placeholder="John Doe"
                      autoComplete="name"
                      autoFocus
                    />
                    <TextField
                      name="email"
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errorFor("email")}
                      hint="Your confirmation will be sent here."
                      placeholder="john@example.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                    <TextField
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errorFor("phone")}
                      placeholder="+234 801 234 5678"
                      autoComplete="tel"
                      inputMode="tel"
                    />

                    {/* ── Student-only fields ── */}
                    {isStudent ? (
                      <>
                        <TextField
                          name="institution"
                          label="Institution / University"
                          required
                          value={formData.institution}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errorFor("institution")}
                          placeholder="University of Lagos"
                          autoComplete="organization"
                        />
                        <TextField
                          name="studentId"
                          label="Student ID / Matric Number"
                          required
                          value={formData.studentId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errorFor("studentId")}
                          hint="You'll email a copy of your student ID after registering."
                          placeholder="e.g. MGS404021"
                          autoComplete="off"
                        />
                        <SelectField
                          name="level"
                          label="Level / Year of Study"
                          optional
                          value={formData.level}
                          options={LEVELS.map((l) => ({ value: l, label: l }))}
                          placeholder="Select level"
                          onChange={handleSelectChange}
                          onBlur={handleBlur}
                        />
                        <TextField
                          name="course"
                          label="Course of Study"
                          optional
                          value={formData.course}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g. Transport Management"
                        />
                      </>
                    ) : (
                      <>
                        <TextField
                          name="organization"
                          label="Organization"
                          required
                          value={formData.organization}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errorFor("organization")}
                          placeholder="Company Name"
                          autoComplete="organization"
                        />
                        <TextField
                          name="position"
                          label="Position / Title"
                          optional
                          value={formData.position}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="CEO, Director, etc."
                          autoComplete="organization-title"
                        />
                        {selectedPackage === "bloc" && (
                          <SelectField
                            name="delegates"
                            label="Number of Delegates"
                            required
                            value={formData.delegates}
                            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                              (num) => ({
                                value: String(num),
                                label: `${num} Delegate${num > 1 ? "s" : ""}`,
                              })
                            )}
                            placeholder="Select number of delegates"
                            onChange={handleSelectChange}
                            onBlur={handleBlur}
                            error={errorFor("delegates")}
                            hint="The Bloc package covers up to 10 delegate passes."
                          />
                        )}
                      </>
                    )}
                  </div>

                  <div className="mt-5">
                    <FieldShell
                      id="specialRequests"
                      label="Special Requests"
                      optional
                      hint="Dietary needs, accessibility, or anything else we should know."
                    >
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        aria-describedby="specialRequests-hint"
                        className={inputClass(false)}
                        placeholder="Any special requirements..."
                      />
                    </FieldShell>
                  </div>
                </div>

                {attemptedSubmit && hasErrors && (
                  <ErrorBanner message="Please fix the highlighted fields to continue." />
                )}

                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
                  >
                    {isFree ? "Continue" : "Proceed to Payment"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ───────── Step 3: Payment or Free Confirmation ───────── */}
            {step === 3 && !hasErrors && (
              <div className="space-y-6">
                <div className="bg-white border border-[#d4d8d0] rounded-xl p-6">
                  <SummaryBar
                    name={selectedPackageData?.name}
                    price={selectedPackageData?.priceFormatted}
                    isFree={isFree}
                    couponCode={appliedCoupon}
                  />

                  <div className="mb-6 rounded-lg bg-[#f7f6f2] px-4 py-3 text-sm text-[#4a5a4a] flex items-center justify-between gap-4">
                    <p className="min-w-0">
                      Registering{" "}
                      <strong className="text-[#1a2b1a]">
                        {formData.fullName.trim()}
                      </strong>{" "}
                      <span className="break-all">
                        ({formData.email.trim()})
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => goToStep(2, selectedPackage)}
                      className="text-xs font-semibold text-[#3B6D11] hover:underline shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  <h2
                    className="text-xl font-black text-[#1a2b1a] mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {isFree ? "Confirm & Submit" : "Select Payment Method"}
                  </h2>

                  {isFree ? (
                    /* ── Free registration — no payment needed ── */
                    <div className="space-y-6">
                      <div className="flex items-start gap-3 bg-[#eaf3de] rounded-lg p-4">
                        <PartyPopper className="w-5 h-5 text-[#3B6D11] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#1a2b1a]">
                          Coupon <strong>{appliedCoupon}</strong> makes this
                          registration free. No payment is required — just
                          confirm your details and submit.
                        </p>
                      </div>

                      {paymentError && <ErrorBanner message={paymentError} />}

                      <div className="flex justify-between gap-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleFreeSubmit}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:opacity-50"
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : "Complete Free Registration"}
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : !paymentMethod ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className="p-6 border border-[#d4d8d0] rounded-xl text-center hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-all group"
                      >
                        <CreditCard className="w-12 h-12 text-[#3B6D11] mx-auto mb-3 opacity-70 group-hover:opacity-100" />
                        <h3 className="font-bold text-[#1a2b1a] mb-1">
                          Pay Online
                        </h3>
                        <p className="text-xs text-[#4a5a4a]">
                          Card, Bank Transfer, USSD
                        </p>
                        <p className="text-xs text-[#3B6D11] mt-2 font-semibold">
                          Powered by Paystack
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transfer")}
                        className="p-6 border border-[#d4d8d0] rounded-xl text-center hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-all group"
                      >
                        <Landmark className="w-12 h-12 text-[#3B6D11] mx-auto mb-3 opacity-70 group-hover:opacity-100" />
                        <h3 className="font-bold text-[#1a2b1a] mb-1">
                          Bank Transfer
                        </h3>
                        <p className="text-xs text-[#4a5a4a]">
                          Direct bank transfer
                        </p>
                      </button>
                    </div>
                  ) : (
                    <div>
                      {paymentMethod === "card" && (
                        <div className="space-y-6">
                          <div className="bg-[#eaf3de] rounded-lg p-4">
                            <p className="text-sm text-[#1a2b1a]">
                              A secure Paystack window will open so you can
                              complete your payment without leaving this page.
                            </p>
                          </div>

                          {paystackFailed && (
                            <ErrorBanner message="We couldn't load the payment window. Turn off any ad blocker for this site, check your connection, then reload the page. You can also pay by bank transfer instead." />
                          )}

                          {paymentError && (
                            <ErrorBanner message={paymentError} />
                          )}

                          <div className="flex justify-between gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                setPaymentError(null);
                                setPaymentMethod(null);
                              }}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={handlePayWithPaystack}
                              disabled={!paystackReady || isSubmitting}
                              className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting
                                ? "Processing..."
                                : paystackReady
                                ? `Pay ${selectedPackageData?.priceFormatted}`
                                : "Loading payment..."}
                            </button>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "transfer" && (
                        <form
                          onSubmit={handleTransferSubmit}
                          className="space-y-6"
                        >
                          {/* Bank Account Selection */}
                          <div>
                            <p className="block text-sm font-semibold text-[#1a2b1a] mb-3">
                              Select Account to Transfer To:
                            </p>
                            <div className="grid gap-3">
                              {bankAccounts.map((account) => (
                                <button
                                  key={account.id}
                                  type="button"
                                  aria-pressed={
                                    selectedBankAccount === account.id
                                  }
                                  onClick={() =>
                                    setSelectedBankAccount(account.id)
                                  }
                                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                    selectedBankAccount === account.id
                                      ? "border-[#3B6D11] bg-[#eaf3de] ring-1 ring-[#3B6D11]/20"
                                      : "border-[#d4d8d0] bg-white hover:border-[#3B6D11]/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#eaf3de] flex items-center justify-center">
                                      {account.currency === "USD" ? (
                                        <DollarSign className="w-5 h-5 text-[#3B6D11]" />
                                      ) : (
                                        <Building2 className="w-5 h-5 text-[#3B6D11]" />
                                      )}
                                    </div>
                                    <div className="text-left">
                                      <p className="font-semibold text-[#1a2b1a]">
                                        {account.bankName}
                                      </p>
                                      <p className="text-xs text-[#4a5a4a]">
                                        {account.currency} Account
                                      </p>
                                    </div>
                                  </div>
                                  {selectedBankAccount === account.id && (
                                    <CheckCircle className="w-5 h-5 text-[#3B6D11]" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Selected Bank Details */}
                          {selectedBank && (
                            <div className="bg-[#eaf3de] rounded-lg p-6 space-y-4">
                              <div className="text-center pb-4 border-b border-[#3B6D11]/20">
                                <Landmark className="w-12 h-12 text-[#3B6D11] mx-auto mb-2" />
                                <h3 className="font-bold text-[#1a2b1a] text-lg">
                                  Bank Transfer Details
                                </h3>
                                <p className="text-xs text-[#4a5a4a] mt-1">
                                  {selectedBank.currency} Account
                                </p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                  <span className="text-sm text-[#4a5a4a]">
                                    Bank:
                                  </span>
                                  <span className="text-sm font-semibold text-[#1a2b1a]">
                                    {selectedBank.bankName}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center gap-4 pb-2 border-b border-[#3B6D11]/10">
                                  <span className="text-sm text-[#4a5a4a]">
                                    Account Name:
                                  </span>
                                  <span className="text-sm font-semibold text-[#1a2b1a] text-right">
                                    {selectedBank.accountName}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                  <span className="text-sm text-[#4a5a4a]">
                                    Account Number:
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#1a2b1a] font-mono text-lg">
                                      {selectedBank.accountNumber}
                                    </span>
                                    <button
                                      type="button"
                                      aria-label="Copy account number"
                                      onClick={() =>
                                        handleCopyAccountNumber(
                                          selectedBank.accountNumber,
                                          selectedBank.id
                                        )
                                      }
                                      className="p-1.5 hover:bg-white rounded transition-colors"
                                    >
                                      {copiedAccountId === selectedBank.id ? (
                                        <Check className="w-4 h-4 text-[#3B6D11]" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-[#4a5a4a]" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                                {selectedBank.sortCode && (
                                  <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                    <span className="text-sm text-[#4a5a4a]">
                                      Sort Code:
                                    </span>
                                    <span className="text-sm font-semibold text-[#1a2b1a] font-mono">
                                      {selectedBank.sortCode}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between items-center pt-2">
                                  <span className="text-sm text-[#4a5a4a]">
                                    Amount to Pay:
                                  </span>
                                  <span className="text-xl font-bold text-[#3B6D11]">
                                    {selectedBank.currency === "USD"
                                      ? selectedPackageData?.usdPrice
                                      : selectedPackageData?.priceFormatted}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="bg-white border border-[#d4d8d0] rounded-lg p-4">
                            <p className="text-sm font-semibold text-[#1a2b1a] mb-2">
                              📌 Important Instructions:
                            </p>
                            <ol className="text-sm text-[#4a5a4a] space-y-2 list-decimal list-inside">
                              <li>
                                Make a transfer to the account details above
                              </li>
                              <li>
                                Use your <strong>full name</strong> as the
                                payment reference
                              </li>
                              {isStudent && (
                                <li>
                                  Email a copy of your{" "}
                                  <strong>valid student ID</strong> for
                                  verification along with your receipt
                                </li>
                              )}
                              <li>
                                After payment, send your payment receipt to:{" "}
                                <strong className="text-[#3B6D11]">
                                  {emailForReceipt}
                                </strong>
                              </li>
                              <li>
                                Use the subject line:{" "}
                                <strong>
                                  &quot;GAMMAT 2026 Payment -{" "}
                                  {formData.fullName}&quot;
                                </strong>
                              </li>
                              <li>
                                Your registration will be confirmed within 24
                                hours
                              </li>
                            </ol>
                          </div>

                          {paymentError && (
                            <ErrorBanner message={paymentError} />
                          )}

                          <div className="flex justify-between gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                setPaymentError(null);
                                setPaymentMethod(null);
                              }}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:opacity-50"
                            >
                              {isSubmitting
                                ? "Processing..."
                                : "I've Made the Transfer"}
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                {!isFree && !paymentMethod && (
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to details
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
