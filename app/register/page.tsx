// app/register/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";

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

const registrationPackages = [
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

const bankDetails = {
  bankName: "First Bank of Nigeria",
  accountName: "Aspire West Africa Ltd",
  accountNumber: "2034567890",
  sortCode: "011234567",
  emailForReceipt: "finance@aspirewestafrica.com",
};

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPackage, setSelectedPackage] = useState<string>("single");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | null
  >(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const scriptLoadedRef = useRef(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    delegates: "",
    specialRequests: "",
  });

  // Load Paystack script on component mount
  useEffect(() => {
    const script = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );
    if (!script) {
      const newScript = document.createElement("script");
      newScript.src = "https://js.paystack.co/v1/inline.js";
      newScript.async = true;
      newScript.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.body.appendChild(newScript);
    } else {
      scriptLoadedRef.current = true;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
      setPaymentMethod(null);
    }
  };

  const handleProceedToPayment = () => {
    setStep(3);
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPackageData = registrationPackages.find(
    (p) => p.id === selectedPackage
  );

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setSelectedPackage("single");
    setPaymentMethod(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      delegates: "",
      specialRequests: "",
    });
  };

  const handlePayWithPaystack = () => {
    if (!scriptLoadedRef.current || !window.PaystackPop) {
      console.error("Paystack script not loaded");
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    const paystack = window.PaystackPop;
    const handler = paystack.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      email: formData.email,
      amount: selectedPackageData?.price || 0,
      currency: "NGN",
      ref: `GAMMAT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      firstname: formData.fullName.split(" ")[0],
      lastname: formData.fullName.split(" ").slice(1).join(" "),
      phone: formData.phone,
      metadata: {
        custom_fields: [
          {
            display_name: "Package",
            variable_name: "package",
            value: selectedPackageData?.name,
          },
          {
            display_name: "Organization",
            variable_name: "organization",
            value: formData.organization,
          },
        ],
      },
      onSuccess: () => {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitted(true);
        }, 1500);
      },
      onCancel: () => {
        console.log("Payment cancelled");
      },
    });
    handler.openIframe();
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

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
      <section className="px-6 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1
                    ? "bg-[#3B6D11] text-white"
                    : "bg-[#d4d8d0] text-[#4a5a4a]"
                }`}
              >
                1
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 1 ? "text-[#1a2b1a]" : "text-[#4a5a4a]/50"
                }`}
              >
                Select Package
              </span>
            </div>
            <div className="w-12 h-0.5 bg-[#d4d8d0]" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2
                    ? "bg-[#3B6D11] text-white"
                    : "bg-[#d4d8d0] text-[#4a5a4a]"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 2 ? "text-[#1a2b1a]" : "text-[#4a5a4a]/50"
                }`}
              >
                Your Details
              </span>
            </div>
            <div className="w-12 h-0.5 bg-[#d4d8d0]" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 3
                    ? "bg-[#3B6D11] text-white"
                    : "bg-[#d4d8d0] text-[#4a5a4a]"
                }`}
              >
                3
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 3 ? "text-[#1a2b1a]" : "text-[#4a5a4a]/50"
                }`}
              >
                Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {submitted ? (
          <div className="bg-[#eaf3de] border border-[#3B6D11]/30 rounded-xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-[#3B6D11] mx-auto mb-4" />
            <h3 className="text-2xl font-black text-[#1a2b1a] mb-2">
              Registration Successful!
            </h3>
            <p className="text-[#4a5a4a] mb-4">
              Thank you for registering for GAMMAT 2026. A confirmation email
              has been sent to {formData.email}.
            </p>
            {paymentMethod === "transfer" && (
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-[#3B6D11] font-semibold mb-2">
                  ⚠️ Important:
                </p>
                <p className="text-sm text-[#4a5a4a]">
                  Your registration will be confirmed once your payment is
                  verified. Please send your payment receipt to{" "}
                  <strong className="text-[#1a2b1a]">
                    {bankDetails.emailForReceipt}
                  </strong>{" "}
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
            {/* Step 1: Select Package */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {registrationPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? "border-[#3B6D11] bg-[#eaf3de] ring-1 ring-[#3B6D11]/20"
                          : "border-[#d4d8d0] bg-white hover:border-[#3B6D11]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center">
                              <pkg.icon className="w-5 h-5 text-[#3B6D11]" />
                            </div>
                            <h4 className="text-xl font-bold text-[#1a2b1a]">
                              {pkg.name}
                            </h4>
                          </div>
                          {pkg.popular && (
                            <span className="inline-block text-[10px] font-bold bg-[#3B6D11] text-white px-2 py-0.5 rounded-md">
                              Most Popular
                            </span>
                          )}
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

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Registration Form */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-white border border-[#d4d8d0] rounded-xl p-6">
                  <div className="mb-6 pb-6 border-b border-[#d4d8d0]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-[#4a5a4a]/70 mb-1">
                          Selected Package
                        </p>
                        <p className="text-lg font-bold text-[#1a2b1a]">
                          {selectedPackageData?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#4a5a4a]/70 mb-1">
                          Total Amount
                        </p>
                        <p className="text-xl font-bold text-[#3B6D11]">
                          {selectedPackageData?.priceFormatted}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2
                    className="text-xl font-black text-[#1a2b1a] mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Your Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm"
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                        Position/Title
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm"
                        placeholder="CEO, Director, etc."
                      />
                    </div>
                    {selectedPackage === "bloc" && (
                      <div>
                        <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                          Number of Delegates *
                        </label>
                        <select
                          name="delegates"
                          required
                          value={formData.delegates}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] focus:outline-none focus:border-[#3B6D11] text-sm"
                        >
                          <option value="">Select number of delegates</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} Delegate{num > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[#1a2b1a] mb-2">
                      Special Requests (Dietary, Accessibility, etc.)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm"
                      placeholder="Any special requirements..."
                    />
                  </div>
                </div>

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
                    onClick={handleProceedToPayment}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
                  >
                    Proceed to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white border border-[#d4d8d0] rounded-xl p-6">
                  <div className="mb-6 pb-6 border-b border-[#d4d8d0]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-[#4a5a4a]/70 mb-1">
                          Selected Package
                        </p>
                        <p className="text-lg font-bold text-[#1a2b1a]">
                          {selectedPackageData?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#4a5a4a]/70 mb-1">
                          Total Amount
                        </p>
                        <p className="text-xl font-bold text-[#3B6D11]">
                          {selectedPackageData?.priceFormatted}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2
                    className="text-xl font-black text-[#1a2b1a] mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Select Payment Method
                  </h2>

                  {!paymentMethod ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
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
                              You will be redirected to Paystack&apos;s secure
                              payment page to complete your transaction.
                            </p>
                          </div>
                          <div className="flex justify-between gap-4">
                            <button
                              onClick={() => setPaymentMethod(null)}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de] transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                              Back
                            </button>
                            <button
                              onClick={handlePayWithPaystack}
                              className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors cursor-pointer"
                            >
                              Pay Now with Paystack
                            </button>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "transfer" && (
                        <form
                          onSubmit={handleTransferSubmit}
                          className="space-y-6"
                        >
                          <div className="bg-[#eaf3de] rounded-lg p-6 space-y-4">
                            <div className="text-center pb-4 border-b border-[#3B6D11]/20">
                              <Landmark className="w-12 h-12 text-[#3B6D11] mx-auto mb-2" />
                              <h3 className="font-bold text-[#1a2b1a] text-lg">
                                Bank Transfer Details
                              </h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                <span className="text-sm text-[#4a5a4a]">
                                  Bank:
                                </span>
                                <span className="text-sm font-semibold text-[#1a2b1a]">
                                  {bankDetails.bankName}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                <span className="text-sm text-[#4a5a4a]">
                                  Account Name:
                                </span>
                                <span className="text-sm font-semibold text-[#1a2b1a]">
                                  {bankDetails.accountName}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                <span className="text-sm text-[#4a5a4a]">
                                  Account Number:
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-[#1a2b1a] font-mono text-lg">
                                    {bankDetails.accountNumber}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleCopyAccountNumber}
                                    className="p-1 hover:bg-white rounded transition-colors"
                                  >
                                    {copied ? (
                                      <Check className="w-4 h-4 text-[#3B6D11]" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-[#4a5a4a]" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center pb-2 border-b border-[#3B6D11]/10">
                                <span className="text-sm text-[#4a5a4a]">
                                  Sort Code:
                                </span>
                                <span className="text-sm font-semibold text-[#1a2b1a] font-mono">
                                  {bankDetails.sortCode}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2">
                                <span className="text-sm text-[#4a5a4a]">
                                  Amount to Pay:
                                </span>
                                <span className="text-xl font-bold text-[#3B6D11]">
                                  {selectedPackageData?.priceFormatted}
                                </span>
                              </div>
                            </div>
                          </div>

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
                              <li>
                                After payment, send your payment receipt to:{" "}
                                <strong className="text-[#3B6D11]">
                                  {bankDetails.emailForReceipt}
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

                          <div className="flex justify-between gap-4">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod(null)}
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
                                : "Submit Registration"}
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
