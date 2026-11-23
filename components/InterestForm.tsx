"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const INTEREST_TYPES = [
  "Delegation / attending",
  "Exhibiting",
  "Sponsorship / partnership",
  "Speaking",
  "Media & press",
  "Something else",
];

interface Props {
  /** Tighter spacing + no intro copy — used inside the modal. */
  compact?: boolean;
  onSuccess?: () => void;
}

export default function InterestForm({ compact = false, onSuccess }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    interest: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const update = (name: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.interest) {
      setError("Please select how you'd like to take part.");
      return;
    }
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.organization.trim(),
          inquiryType: "2027 interest",
          message: `Interest: ${form.interest}\nRegistered interest in GAMMAT 2027`,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Unable to save your interest.");
      }
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(
        "We couldn't save your interest. Check your connection and try again, or email info@aspirewestafrica.com.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className={compact ? "py-4 text-center" : "py-10 text-center"}>
        <CheckCircle className="mx-auto mb-3 h-12 w-12 text-[#3B6D11]" />
        <h3 className="mb-2 text-xl font-bold text-[#1a2b1a]">
          You&apos;re on the list
        </h3>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#4a5a4a]">
          We&apos;ll email you at{" "}
          <strong className="text-[#1a2b1a]">{form.email}</strong> the moment
          2027 registration opens.
        </p>
      </div>
    );
  }

  const inputCls =
    "mt-1.5 block w-full rounded-md border border-[#d4d8d0] bg-white px-3.5 py-2.5 text-sm text-[#1a2b1a] placeholder:text-[#4a5a4a]/50 focus:border-[#3B6D11] focus:outline-none focus:ring-1 focus:ring-[#3B6D11]/30";
  const labelCls = "block text-sm font-semibold text-[#1a2b1a]";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Full name *
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputCls}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </label>
        <label className={labelCls}>
          Email address *
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            placeholder="jane@company.com"
            autoComplete="email"
          />
        </label>
      </div>

      <div>
        <span className={`${labelCls} block`}>
          How would you like to take part? *
        </span>
        <Select
          value={form.interest}
          onValueChange={(v) => update("interest", v ?? "")}
        >
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {INTEREST_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Phone{" "}
          <span className="font-normal text-[#4a5a4a]/60">(optional)</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputCls}
            placeholder="+234 801 234 5678"
            autoComplete="tel"
          />
        </label>
        <label className={labelCls}>
          Organization{" "}
          <span className="font-normal text-[#4a5a4a]/60">(optional)</span>
          <input
            type="text"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            className={inputCls}
            placeholder="Company name"
            autoComplete="organization"
          />
        </label>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#04102a] cursor-pointer border border-[#04102a] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0d1a35] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? "Saving…" : "Register my interest"}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>

      <p className="text-xs leading-relaxed text-[#4a5a4a]/70">
        We&apos;ll only email you about GAMMAT 2027.
      </p>
    </form>
  );
}
