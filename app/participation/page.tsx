// app/participation/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Check, Mail, MapPin, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */

const awardCategories = [
  "Aviation",
  "Maritime",
  "Oil & Gas",
  "Energy",
  "Technology",
  "Hospitality",
  "Financial Services",
  "Healthcare",
  "Logistics",
  "Manufacturing",
  "Impact Leadership",
  "Sustainability",
];

const tablePackages = [
  {
    label: "VVIP Participation Access",
    price: "₦1,500,000",
    details: ["Priority seating", "Gala access", "Meet & greet"],
  },
  {
    label: "VIP Table",
    price: "₦1,200,000",
    details: ["Reserved table", "Brand exposure", "Networking lounge"],
  },
  {
    label: "Diamond Table",
    price: "₦950,000",
    details: ["Premium table", "Event branding", "Guest tickets"],
  },
  {
    label: "Platinum Table",
    price: "₦750,000",
    details: ["Table for 10", "Logo placement", "Refreshments"],
  },
  {
    label: "Gold Table",
    price: "₦550,000",
    details: ["Table for 8", "Event listing", "Refreshments"],
  },
  {
    label: "Silver Participation Access",
    price: "₦250,000",
    details: ["Summit access", "Networking sessions"],
  },
  {
    label: "Executive Participation Access",
    price: "₦180,000",
    details: ["Access to conference sessions", "Materials"],
  },
  {
    label: "Office Presentation / Non-Attending Awardee",
    price: "₦90,000",
    details: ["Digital badge", "Award mention"],
  },
];

const STEPS = [
  "Awardee details",
  "Participation package",
  "Media & visibility",
  "Review & submit",
] as const;

const STORAGE_KEY = "gammat-2026-participation-form";

/* ─────────────────────────────────────────────────────────────
   Types + validation
───────────────────────────────────────────────────────────── */

interface FormState {
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

type FieldName = keyof FormState;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormState = {
  awardeeName: "",
  awardCategory: "",
  organization: "",
  contactPerson: "",
  position: "",
  industrySector: "",
  country: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  acceptedNomination: false,
  packageChoice: "",
  mediaPackage: "",
  profileLink: "",
  spotlight: false,
  panel: false,
  collateral: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const looksLikeUrl = (v: string) => !/\s/.test(v) && /\.[a-z]{2,}/i.test(v);

// Fields (in on-screen order) that belong to each step
const STEP_FIELDS: FieldName[][] = [
  [
    "awardeeName",
    "awardCategory",
    "organization",
    "contactPerson",
    "industrySector",
    "country",
    "email",
    "phone",
    "website",
    "acceptedNomination",
  ],
  ["packageChoice"],
  ["profileLink"],
  [],
];

const validate = (d: FormState): FormErrors => {
  const e: FormErrors = {};
  if (!d.awardeeName.trim()) e.awardeeName = "Enter the awardee's full name.";
  if (!d.awardCategory) e.awardCategory = "Choose an award category.";
  if (!d.organization.trim()) e.organization = "Enter the organization name.";
  if (!d.contactPerson.trim()) e.contactPerson = "Enter a contact person.";
  if (!d.industrySector.trim()) e.industrySector = "Enter the industry.";
  if (!d.country.trim()) e.country = "Enter the country.";

  if (!d.email.trim()) e.email = "Enter an email address.";
  else if (!EMAIL_RE.test(d.email.trim()))
    e.email = "Enter a valid email, like name@company.com.";

  const digits = d.phone.replace(/\D/g, "");
  if (!d.phone.trim()) e.phone = "Enter a phone or WhatsApp number.";
  else if (
    digits.length < 7 ||
    digits.length > 15 ||
    /[^\d+\s()-]/.test(d.phone)
  )
    e.phone = "Enter a valid number, like +234 801 234 5678.";

  if (d.website.trim() && !looksLikeUrl(d.website.trim()))
    e.website = "Enter a valid website, like company.com.";
  if (d.profileLink.trim() && !looksLikeUrl(d.profileLink.trim()))
    e.profileLink = "Enter a valid link, like company.com/profile.";

  if (!d.acceptedNomination)
    e.acceptedNomination = "Confirm that the awardee accepts the nomination.";
  if (!d.packageChoice) e.packageChoice = "Choose a participation package.";
  return e;
};

/* ─────────────────────────────────────────────────────────────
   Small components (kept outside the page so inputs never
   remount and lose focus while typing)
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
}: {
  name: FieldName;
  label: string;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  onBlur: (name: FieldName) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
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
  required,
}: {
  name: FieldName;
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (name: FieldName, value: string) => void;
  onBlur: (name: FieldName) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <FieldShell id={name} label={label} required={required} error={error}>
      <Select
        value={value}
        onValueChange={(v) => onChange(name, v ?? "")}
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
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-[#d4d8d0] accent-[#3B6D11]"
      />
      <span className="text-sm text-[#4a5a4a]">{children}</span>
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-[#1a2b1a] pb-2 mb-4 border-b border-[#e3e6df]">
      {children}
    </h3>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#e3e6df] bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-[#3B6D11]">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-[#3B6D11] hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="grid gap-2 text-sm text-[#4a5a4a]">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <p>
      <span className="font-semibold text-[#1a2b1a]">{label}:</span>{" "}
      {value?.trim() || "Not provided"}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */

export default function ParticipationPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#3B6D11]">
              GAMMAT 2026 Participation
            </span>
            <span className="w-8 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1a2b1a] leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            GAMMAT 2026{" "}
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#e05c10] via-[#3db340] to-[#1a70c8]">
              Acceptance &amp; Participation
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#4a5a4a] leading-relaxed">
            Complete your participation request in four short steps: awardee
            details, package, media preferences, then review and submit.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <ParticipationStepper />

          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <div className="bg-[#eef5ea] w-full text-left p-6 rounded-xl border border-[#d4d8d0]">
              <p className="text-xs uppercase tracking-[0.18em] font-bold text-[#3B6D11] mb-3">
                Need assistance?
              </p>
              <div className="space-y-4 text-sm text-[#4a5a4a]">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#3B6D11] mt-1" />
                  <div>
                    <p className="font-semibold text-[#1a2b1a]">Email</p>
                    info@aspirewestafrica.com
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#3B6D11] mt-1" />
                  <div>
                    <p className="font-semibold text-[#1a2b1a]">Phone</p>
                    +234 806 662 6462
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#3B6D11] mt-1" />
                  <div>
                    <p className="font-semibold text-[#1a2b1a]">Venue</p>
                    Oriental Hotel, Victoria Island, Lagos
                  </div>
                </div>
              </div>
              <a
                href="mailto:info@aspirewestafrica.com"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#3B6D11] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-[#2e5f1e] transition-colors"
              >
                Send enquiry
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function ParticipationStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [attempted, setAttempted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const errors = useMemo(() => validate(formData), [formData]);
  const stepErrors = STEP_FIELDS[currentStep].filter((f) => errors[f]);
  const isLast = currentStep === STEPS.length - 1;

  const selectedPackage = tablePackages.find(
    (p) => p.label === formData.packageChoice
  );

  // Show an error only after the field has been left, or after a
  // failed attempt to continue.
  const errorFor = (name: FieldName) =>
    touched[name] || attempted ? errors[name] : undefined;

  /* ── Remember progress across refreshes ──
     One-time hydration from sessionStorage. sessionStorage has no
     subscription API, so the "subscribe and setState in a callback"
     pattern this rule expects doesn't apply. Reading it once on
     mount is the correct pattern for restoring a saved draft. */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        return saved ? { ...EMPTY_FORM, ...JSON.parse(saved) } : prev;
      } catch {
        return prev;
      }
    });
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

  /* ── Scroll to the top of the card on every step change ── */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  const updateField = (name: FieldName, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  };

  const handleSelect = (name: FieldName, value: string) => {
    updateField(name, value);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const goToStep = (step: number) => {
    setAttempted(false);
    setCurrentStep(step);
  };

  const prevStep = () => goToStep(Math.max(currentStep - 1, 0));

  const focusFirstInvalid = () => {
    const first = stepErrors[0];
    if (!first) return;
    const el = document.getElementById(first);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };

  const submitToApi = async () => {
    setLoading(true);
    setSubmitError("");

    // Trim text fields before sending
    const payload = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ])
    );

    try {
      const response = await fetch("/api/participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to send participation request."
        );
      }

      setSubmitted(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      trackGoogleAdsConversion();
    } catch (error) {
      console.error(error);
      setSubmitError(
        "We couldn't send your request. Check your connection and try again, or email info@aspirewestafrica.com."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (stepErrors.length > 0) {
      setAttempted(true);
      // wait a tick so the error messages render before focusing
      setTimeout(focusFirstInvalid, 0);
      return;
    }

    if (!isLast) {
      goToStep(currentStep + 1);
      return;
    }

    // Final safety check across every step
    const firstBadStep = STEP_FIELDS.findIndex((fields) =>
      fields.some((f) => errors[f])
    );
    if (firstBadStep !== -1) {
      setAttempted(true);
      setCurrentStep(firstBadStep);
      return;
    }

    submitToApi();
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setTouched({});
    setAttempted(false);
    setSubmitted(false);
    setSubmitError("");
    setCurrentStep(0);
  };

  const trackGoogleAdsConversion = () => {
    if (typeof window === "undefined") return;

    const gtag = (
      window as Window &
        typeof globalThis & {
          gtag?: (...args: unknown[]) => void;
        }
    ).gtag;

    gtag?.("event", "conversion", {
      send_to: "AW-18453740960/XRANCNGI8_0cEKD7tt9E",
    });
  };

  const visibilityChoices = [
    formData.spotlight && "Spotlight session",
    formData.panel && "Panel feature",
    formData.collateral && "Branded collateral",
  ].filter(Boolean) as string[];

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="rounded-xl border border-[#3B6D11]/30 bg-[#eaf3de] p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#3B6D11]">
          <Check className="h-7 w-7 text-white" />
        </div>
        <h2 className="text-2xl font-black text-[#1a2b1a] mb-2">
          Request sent
        </h2>
        <p className="text-[#4a5a4a] mb-6">
          Thank you. The GAMMAT team has your participation request and will
          follow up at {formData.email.trim()}.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      ref={topRef}
      className="w-full scroll-mt-28 text-left p-6 rounded-xl border border-[#d4d8d0] bg-white"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Progress */}
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#3B6D11] font-bold">
            Step {currentStep + 1} of {STEPS.length}
          </p>
          <h2 className="text-3xl font-black text-[#1a2b1a] mt-2">
            {STEPS[currentStep]}
          </h2>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-[#e3e6df]"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={currentStep + 1}
          >
            <div
              className="h-full rounded-full bg-[#3B6D11] transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / STEPS.length) * 100}%`,
              }}
            />
          </div>
          {currentStep === 0 && (
            <p className="text-xs text-[#4a5a4a]/70 mt-3">
              Fields marked <span className="text-red-600">*</span> are
              required.
            </p>
          )}
        </div>

        {/* ───────── Step 1: Awardee details ───────── */}
        {currentStep === 0 && (
          <div className="space-y-8">
            <div>
              <SectionTitle>Awardee</SectionTitle>
              <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                <TextField
                  name="awardeeName"
                  label="Awardee Full Name"
                  required
                  value={formData.awardeeName}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("awardeeName")}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
                <SelectField
                  name="awardCategory"
                  label="Award Category"
                  required
                  value={formData.awardCategory}
                  options={awardCategories}
                  placeholder="Select category"
                  onChange={handleSelect}
                  onBlur={handleBlur}
                  error={errorFor("awardCategory")}
                />
                <TextField
                  name="organization"
                  label="Organization / Company"
                  required
                  value={formData.organization}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("organization")}
                  placeholder="Company name"
                  autoComplete="organization"
                />
                <TextField
                  name="position"
                  label="Position / Designation"
                  optional
                  value={formData.position}
                  onChange={updateField}
                  onBlur={handleBlur}
                  placeholder="CEO, Director, etc."
                  autoComplete="organization-title"
                />
                <TextField
                  name="industrySector"
                  label="Industry / Sector"
                  required
                  value={formData.industrySector}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("industrySector")}
                  placeholder="Aviation, Finance, Tech..."
                />
                <TextField
                  name="country"
                  label="Country"
                  required
                  value={formData.country}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("country")}
                  placeholder="Nigeria"
                  autoComplete="country-name"
                />
              </div>
            </div>

            <div>
              <SectionTitle>Who should we contact?</SectionTitle>
              <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                <TextField
                  name="contactPerson"
                  label="Contact Person"
                  required
                  value={formData.contactPerson}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("contactPerson")}
                  hint="Enter the awardee's name if they are the contact."
                  placeholder="Full name"
                />
                <div className="hidden sm:block" />
                <TextField
                  name="email"
                  label="Official Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("email")}
                  placeholder="you@company.com"
                  autoComplete="email"
                  inputMode="email"
                />
                <TextField
                  name="phone"
                  label="Mobile / WhatsApp"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("phone")}
                  placeholder="+234 801 234 5678"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </div>

            <div>
              <SectionTitle>Online presence (optional)</SectionTitle>
              <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                <TextField
                  name="website"
                  label="Company Website"
                  optional
                  value={formData.website}
                  onChange={updateField}
                  onBlur={handleBlur}
                  error={errorFor("website")}
                  placeholder="company.com"
                  autoComplete="url"
                  inputMode="url"
                />
                <TextField
                  name="linkedin"
                  label="LinkedIn"
                  optional
                  value={formData.linkedin}
                  onChange={updateField}
                  onBlur={handleBlur}
                  placeholder="linkedin.com/in/username"
                />
                <TextField
                  name="instagram"
                  label="Instagram"
                  optional
                  value={formData.instagram}
                  onChange={updateField}
                  onBlur={handleBlur}
                  placeholder="@company"
                />
                <TextField
                  name="twitter"
                  label="X / Twitter"
                  optional
                  value={formData.twitter}
                  onChange={updateField}
                  onBlur={handleBlur}
                  placeholder="@company"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="acceptedNomination"
                className={`flex items-start gap-3 rounded-xl border p-5 text-sm text-[#4a5a4a] cursor-pointer ${
                  errorFor("acceptedNomination")
                    ? "border-red-300 bg-red-50"
                    : "border-[#e3e6df] bg-[#fbfaf7]"
                }`}
              >
                <input
                  id="acceptedNomination"
                  type="checkbox"
                  checked={formData.acceptedNomination}
                  onChange={(e) =>
                    updateField("acceptedNomination", e.target.checked)
                  }
                  onBlur={() => handleBlur("acceptedNomination")}
                  aria-invalid={!!errorFor("acceptedNomination")}
                  className="mt-1 h-4 w-4 rounded border-[#d4d8d0] accent-[#3B6D11]"
                />
                <span>
                  I confirm that the nominated awardee accepts the nomination
                  and will participate in GAMMAT 2026.{" "}
                  <span className="text-red-600">*</span>
                </span>
              </label>
              {errorFor("acceptedNomination") && (
                <p
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.acceptedNomination}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ───────── Step 2: Package ───────── */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <fieldset>
              <legend className="sr-only">Participation package</legend>
              <div className="grid gap-3">
                {tablePackages.map((pkg) => {
                  const active = formData.packageChoice === pkg.label;
                  return (
                    <label
                      key={pkg.label}
                      className={`block cursor-pointer rounded-xl border p-5 transition-all focus-within:ring-2 focus-within:ring-[#3B6D11]/40 ${
                        active
                          ? "border-[#3B6D11] bg-[#eef5ea] shadow-sm"
                          : "border-[#e3e6df] bg-white hover:border-[#a0c29a]"
                      }`}
                    >
                      <input
                        id={
                          pkg === tablePackages[0] ? "packageChoice" : undefined
                        }
                        type="radio"
                        name="packageChoice"
                        value={pkg.label}
                        checked={active}
                        onChange={() => updateField("packageChoice", pkg.label)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              active
                                ? "border-[#3B6D11] bg-[#3B6D11]"
                                : "border-[#c5cbc0] bg-white"
                            }`}
                          >
                            {active && <Check className="h-3 w-3 text-white" />}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#1a2b1a]">
                              {pkg.label}
                            </p>
                            <p className="mt-1 text-sm text-[#4a5a4a]">
                              {pkg.details.join(" · ")}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-black text-[#1a2b1a] shrink-0">
                          {pkg.price}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {errorFor("packageChoice") && (
              <p
                role="alert"
                className="flex items-center gap-1.5 text-sm text-red-600"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.packageChoice}
              </p>
            )}
          </div>
        )}

        {/* ───────── Step 3: Media & visibility ───────── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <p className="text-sm text-[#4a5a4a]">
              Everything on this step is optional. Skip it if you have nothing
              to add.
            </p>
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
              <TextField
                name="mediaPackage"
                label="Media Package"
                optional
                value={formData.mediaPackage}
                onChange={updateField}
                onBlur={handleBlur}
                placeholder="Media kit, press release, etc."
              />
              <TextField
                name="profileLink"
                label="Company Profile Link"
                optional
                value={formData.profileLink}
                onChange={updateField}
                onBlur={handleBlur}
                error={errorFor("profileLink")}
                placeholder="company.com/profile"
                inputMode="url"
              />
            </div>

            <fieldset className="space-y-3 rounded-xl border border-[#e3e6df] bg-white p-5">
              <legend className="px-2 text-sm font-semibold text-[#1a2b1a]">
                Visibility add-ons
              </legend>
              <CheckboxRow
                id="spotlight"
                checked={formData.spotlight}
                onChange={(c) => updateField("spotlight", c)}
              >
                GAMMAT Spotlight Session
              </CheckboxRow>
              <CheckboxRow
                id="panel"
                checked={formData.panel}
                onChange={(c) => updateField("panel", c)}
              >
                Industry Panel Feature
              </CheckboxRow>
              <CheckboxRow
                id="collateral"
                checked={formData.collateral}
                onChange={(c) => updateField("collateral", c)}
              >
                Custom Branded Collateral
              </CheckboxRow>
            </fieldset>
          </div>
        )}

        {/* ───────── Step 4: Review ───────── */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-[#4a5a4a]">
              Check your details, then submit. Use Edit to change anything.
            </p>

            <ReviewCard title="Awardee" onEdit={() => goToStep(0)}>
              <Row label="Name" value={formData.awardeeName} />
              <Row label="Category" value={formData.awardCategory} />
              <Row label="Company" value={formData.organization} />
              <Row label="Position" value={formData.position} />
              <Row label="Industry" value={formData.industrySector} />
              <Row label="Country" value={formData.country} />
              <Row label="Website" value={formData.website} />
            </ReviewCard>

            <ReviewCard title="Contact" onEdit={() => goToStep(0)}>
              <Row label="Contact person" value={formData.contactPerson} />
              <Row label="Email" value={formData.email} />
              <Row label="Phone" value={formData.phone} />
              <Row label="LinkedIn" value={formData.linkedin} />
              <Row label="Instagram" value={formData.instagram} />
              <Row label="X / Twitter" value={formData.twitter} />
            </ReviewCard>

            <ReviewCard title="Package" onEdit={() => goToStep(1)}>
              <p className="flex justify-between gap-4">
                <span className="font-semibold text-[#1a2b1a]">
                  {selectedPackage?.label || "No package selected"}
                </span>
                <span className="font-black text-[#1a2b1a]">
                  {selectedPackage?.price}
                </span>
              </p>
              {selectedPackage && <p>{selectedPackage.details.join(" · ")}</p>}
            </ReviewCard>

            <ReviewCard title="Media & visibility" onEdit={() => goToStep(2)}>
              <Row
                label="Add-ons"
                value={
                  visibilityChoices.length
                    ? visibilityChoices.join(", ")
                    : "None selected"
                }
              />
              <Row label="Media package" value={formData.mediaPackage} />
              <Row label="Profile link" value={formData.profileLink} />
            </ReviewCard>
          </div>
        )}

        {attempted && stepErrors.length > 0 && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              Please fix the highlighted fields to continue.
            </p>
          </div>
        )}

        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || loading}
            className="inline-flex items-center justify-center rounded-md border border-[#d4d8d0] bg-white px-6 py-3 text-sm font-semibold text-[#1a2b1a] transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#f0f3ee]"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Sending request..."
              : isLast
              ? "Submit request"
              : currentStep === 2
              ? "Review"
              : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
