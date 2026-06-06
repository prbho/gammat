"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

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

// const advertRates = [
//   { label: "Full Page Spotlight", price: "₦650,000" },
//   { label: "Half Page Spotlight", price: "₦380,000" },
//   { label: "Sponsored Content", price: "₦220,000" },
//   { label: "Digital Banner", price: "₦150,000" },
// ];

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
              Acceptance & Participation
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#4a5a4a] leading-relaxed">
            Complete your participation request in a guided, registration-style
            flow. Enter awardee details first, then choose a package, add media
            and visibility preferences, and submit.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <ParticipationStepper />

          <aside className="space-y-6">
            <div className="bg-[#eef5ea] w-full text-left p-6 rounded-xl border transition-all duration-300 border-[#d4d8d0] hover:border-[#3B6D11]/50">
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
              <Link
                href="mailto:info@aspirewestafrica.com"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#3B6D11] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-[#2e5f1e] transition-colors"
              >
                Send enquiry
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function ParticipationStepper() {
  const steps = [
    "Awardee details",
    "Participation package",
    "Media & visibility",
    "Review & submit",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedPackage = tablePackages.find(
    (pkg) => pkg.label === formData.packageChoice
  );

  const stepValid = [
    formData.awardeeName.trim().length > 0 &&
      formData.awardCategory.trim().length > 0 &&
      formData.organization.trim().length > 0 &&
      formData.contactPerson.trim().length > 0 &&
      formData.industrySector.trim().length > 0 &&
      formData.country.trim().length > 0 &&
      formData.acceptedNomination,
    formData.packageChoice.length > 0,
    formData.email.trim().length > 0 && formData.phone.trim().length > 0,
    true,
  ];

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (!stepValid[currentStep]) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (currentStep < steps.length - 1) {
      nextStep();
      return;
    }

    setLoading(true);
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/participation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to send participation request."
        );
      }

      setSubmitted(true);
      setSubmissionMessage(
        "Thank you! Your participation request has been sent to the organiser email. The GAMMAT team will follow up shortly."
      );
    } catch (error) {
      console.error(error);
      setSubmissionMessage(
        "There was an error sending your request. Please try again, or contact the organiser directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-left p-6 rounded-xl border transition-all duration-300 border-[#d4d8d0] bg-white hover:border-[#3B6D11]/50">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#3B6D11] font-bold">
            Step {currentStep + 1} of {steps.length}
          </p>
          <h2 className="text-3xl font-black text-[#1a2b1a] mt-2">
            {steps[currentStep]}
          </h2>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e3e6df]">
            <div
              className="h-full rounded-full bg-[#3B6D11] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Full Name*
                <input
                  type="text"
                  value={formData.awardeeName}
                  onChange={(event) =>
                    updateField("awardeeName", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="Jane Doe"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Award Category*
                <select
                  value={formData.awardCategory}
                  onChange={(event) =>
                    updateField("awardCategory", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                >
                  <option value="">Select category</option>
                  {awardCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Organization / Company*
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(event) =>
                    updateField("organization", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="Company name"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Contact Person*
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(event) =>
                    updateField("contactPerson", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="Award nominee name"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Position / Designation
                <input
                  type="text"
                  value={formData.position}
                  onChange={(event) =>
                    updateField("position", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="CEO, Director, etc."
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Industry / Sector*
                <input
                  type="text"
                  value={formData.industrySector}
                  onChange={(event) =>
                    updateField("industrySector", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="Aviation, Finance, Tech..."
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Country*
                <input
                  type="text"
                  value={formData.country}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="Nigeria"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Official Email Address*
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Mobile / WhatsApp*
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="+234 801 234 5678"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Company Website
                <input
                  type="url"
                  value={formData.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="https://"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                LinkedIn
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(event) =>
                    updateField("linkedin", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="linkedin.com/in/username"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Instagram
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(event) =>
                    updateField("instagram", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="@company"
                />
              </label>

              <label className="block text-sm font-semibold text-[#1a2b1a]">
                X / Twitter
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(event) =>
                    updateField("twitter", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="@company"
                />
              </label>
            </div>

            <label className="flex items-start gap-3 rounded-3xl border border-[#e3e6df] bg-[#fbfaf7] p-5 text-sm text-[#4a5a4a]">
              <input
                type="checkbox"
                checked={formData.acceptedNomination}
                onChange={(event) =>
                  updateField("acceptedNomination", event.target.checked)
                }
                className="mt-1 h-4 w-4 rounded border-[#d4d8d0] text-[#3B6D11]"
              />
              <span>
                I confirm that the nominated awardee accepts the nomination and
                will participate in GAMMAT 2026.
              </span>
            </label>

            <div className="rounded-3xl border border-[#e3e6df] bg-[#fbfaf7] p-5 text-sm text-[#4a5a4a]">
              <p className="font-semibold text-[#1a2b1a] mb-2">
                What to expect next
              </p>
              <p>
                After this step, you will choose a participation package and add
                media visibility details.
              </p>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {tablePackages.map((pkg) => (
                <label
                  key={pkg.label}
                  className={`group block cursor-pointer rounded-3xl border p-5 transition-all ${
                    formData.packageChoice === pkg.label
                      ? "border-[#3B6D11] bg-[#eef5ea] shadow-sm"
                      : "border-[#e3e6df] bg-white hover:border-[#a0c29a]"
                  }`}
                >
                  <input
                    type="radio"
                    name="packageChoice"
                    value={pkg.label}
                    checked={formData.packageChoice === pkg.label}
                    onChange={() => updateField("packageChoice", pkg.label)}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#1a2b1a]">
                        {pkg.label}
                      </p>
                      <p className="mt-2 text-sm text-[#4a5a4a]">
                        {pkg.details.join(" · ")}
                      </p>
                    </div>
                    <p className="text-lg font-black text-[#1a2b1a]">
                      {pkg.price}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="rounded-3xl border border-[#e3e6df] bg-[#fbfaf7] p-5 text-sm text-[#4a5a4a]">
              <p className="font-semibold text-[#1a2b1a] mb-2">
                Ready to continue
              </p>
              <p>
                {selectedPackage
                  ? selectedPackage.details.join(" · ")
                  : "Please select a package."}
              </p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Media Package
                <input
                  type="text"
                  value={formData.mediaPackage}
                  onChange={(event) =>
                    updateField("mediaPackage", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="Media kit, press release, etc."
                />
              </label>
              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Company Profile Link
                <input
                  type="url"
                  value={formData.profileLink}
                  onChange={(event) =>
                    updateField("profileLink", event.target.value)
                  }
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="https://"
                />
              </label>
            </div>

            <fieldset className="space-y-3 rounded-3xl border border-[#e3e6df] bg-white p-5">
              <legend className="px-2 text-sm font-semibold text-[#1a2b1a]">
                Visibility addons
              </legend>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.spotlight}
                    onChange={(event) =>
                      updateField("spotlight", event.target.checked)
                    }
                    className="h-4 w-4 rounded border-[#d4d8d0] text-[#3B6D11]"
                  />
                  <span className="text-sm text-[#4a5a4a]">
                    GAMMAT Spotlight Session
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.panel}
                    onChange={(event) =>
                      updateField("panel", event.target.checked)
                    }
                    className="h-4 w-4 rounded border-[#d4d8d0] text-[#3B6D11]"
                  />
                  <span className="text-sm text-[#4a5a4a]">
                    Industry Panel Feature
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.collateral}
                    onChange={(event) =>
                      updateField("collateral", event.target.checked)
                    }
                    className="h-4 w-4 rounded border-[#d4d8d0] text-[#3B6D11]"
                  />
                  <span className="text-sm text-[#4a5a4a]">
                    Custom Branded Collateral
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Contact Email*
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block text-sm font-semibold text-[#1a2b1a]">
                Phone Number*
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#d4d8d0] rounded-md text-[#1a2b1a] placeholder-[#4a5a4a]/50 focus:outline-none focus:border-[#3B6D11] text-sm mt-3"
                  placeholder="+234 801 234 5678"
                />
              </label>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#e3e6df] bg-[#fbfaf7] p-6">
              <p className="text-sm text-[#4a5a4a]">
                Review your details before submitting the participation request.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-[#e3e6df] bg-white p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#3B6D11] font-bold mb-3">
                  Awardee summary
                </p>
                <div className="grid gap-2 text-sm text-[#4a5a4a]">
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">Name:</span>{" "}
                    {formData.awardeeName || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Category:
                    </span>{" "}
                    {formData.awardCategory || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Company:
                    </span>{" "}
                    {formData.organization || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Contact person:
                    </span>{" "}
                    {formData.contactPerson || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Position:
                    </span>{" "}
                    {formData.position || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Industry:
                    </span>{" "}
                    {formData.industrySector || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Country:
                    </span>{" "}
                    {formData.country || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Website:
                    </span>{" "}
                    {formData.website || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-[#e3e6df] bg-white p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#3B6D11] font-bold mb-3">
                  Contact details
                </p>
                <div className="grid gap-2 text-sm text-[#4a5a4a]">
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">Email:</span>{" "}
                    {formData.email || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">Phone:</span>{" "}
                    {formData.phone || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      LinkedIn:
                    </span>{" "}
                    {formData.linkedin || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      Instagram:
                    </span>{" "}
                    {formData.instagram || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1a2b1a]">
                      X / Twitter:
                    </span>{" "}
                    {formData.twitter || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-[#e3e6df] bg-white p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#3B6D11] font-bold mb-3">
                  Package selection
                </p>
                <p className="text-sm text-[#4a5a4a]">
                  {selectedPackage?.label || "No package selected"}
                </p>
                {selectedPackage ? (
                  <p className="mt-2 text-sm text-[#4a5a4a]">
                    {selectedPackage.details.join(" · ")}
                  </p>
                ) : null}
              </div>

              <div className="rounded-3xl border border-[#e3e6df] bg-white p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#3B6D11] font-bold mb-3">
                  Visibility preferences
                </p>
                <p className="text-sm text-[#4a5a4a]">
                  {formData.spotlight ? "Spotlight session, " : ""}
                  {formData.panel ? "Panel feature, " : ""}
                  {formData.collateral ? "Branded collateral" : ""}
                  {!(
                    formData.spotlight ||
                    formData.panel ||
                    formData.collateral
                  )
                    ? "None selected"
                    : ""}
                </p>
                <p className="mt-3 text-sm text-[#4a5a4a]">
                  {formData.mediaPackage
                    ? `Media package: ${formData.mediaPackage}`
                    : "No media package specified."}
                </p>
              </div>
            </div>
          </div>
        )}

        {submissionMessage ? (
          <div
            className={`rounded-3xl border p-4 text-sm ${
              submitted
                ? "border-[#b7d1b2] bg-[#eef5ea] text-[#27441e]"
                : "border-[#e4c5c5] bg-[#fff1f1] text-[#6f1d1d]"
            }`}
          >
            {submissionMessage}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || loading || submitted}
            className="inline-flex items-center justify-center rounded-3xl border border-[#d4d8d0] bg-white px-5 py-3 text-sm font-bold text-[#1a2b1a] transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#f0f3ee]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || submitted || !stepValid[currentStep]}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading
              ? "Sending request..."
              : currentStep === steps.length - 1
              ? "Submit participation request"
              : "Continue to next step"}
          </button>
        </div>
      </div>
    </div>
  );
}
