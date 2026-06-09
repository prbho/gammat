// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Select } from "../../components/ui/Select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Globe,
  Headphones,
  Award,
  Users,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Oriental Hotel Lagos",
      "3 Lekki - Epe Expressway",
      "Victoria Island, Lagos, Nigeria",
    ],
    color: "#e05c10",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+234 806 662 6462", "+234 802 345 6789"],
    color: "#f4a200",
    action: "tel:+2348066626462",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@aspirewestafrica.com", "sponsors@aspirewestafrica.com"],
    color: "#3db340",
    action: "mailto:info@aspirewestafrica.com",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: Closed",
    ],
    color: "#1a70c8",
  },
];

const teamContacts = [
  {
    name: "Conference Secretariat",
    role: "General Inquiries & Registration",
    email: "info@aspirewestafrica.com",
    phone: "+234 806 662 6462",
    icon: Headphones,
  },
  {
    name: "Sponsorship Team",
    role: "Sponsorship & Exhibition Opportunities",
    email: "sponsors@aspirewestafrica.com",
    phone: "+234 802 345 6789",
    icon: Award,
  },
  {
    name: "Speakers Bureau",
    role: "Speaker Nominations & Panel Proposals",
    email: "speakers@aspirewestafrica.com",
    phone: "+234 803 456 7890",
    icon: Users,
  },
  {
    name: "Media & PR",
    role: "Media Accreditation & Press Inquiries",
    email: "media@aspirewestafrica.com",
    phone: "+234 804 567 8901",
    icon: Globe,
  },
];

const faqs = [
  {
    question: "When and where is GAMMAT 2026 taking place?",
    answer:
      "GAMMAT 2026 will take place on 5th November 2026 at the Oriental Hotel, Lagos, Nigeria.",
  },
  {
    question: "How can I register for the summit?",
    answer:
      "You can register online through our registration page. Early bird registration is currently open.",
  },
  {
    question: "Are there sponsorship opportunities available?",
    answer:
      "Yes, we have various sponsorship packages ranging from Silver to Headline Partner. Contact our sponsorship team for more details.",
  },
  {
    question: "Can I submit a proposal to speak at the summit?",
    answer:
      "Yes, speaker nominations are open. Please contact our Speakers Bureau via email.",
  },
  {
    question: "Is there a dress code for the summit?",
    answer:
      "Business formal is recommended for the summit sessions, and black-tie for the Gala Dinner.",
  },
  {
    question: "Will there be networking opportunities?",
    answer:
      "Yes, the summit includes dedicated networking breaks, a leadership luncheon, and a Gala Dinner.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setErrorMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: "Contact Page",
          inquiryType: "Contact",
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send contact message.");
      }

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending contact message:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "There was an error sending your message. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      {/* ── Hero ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Get in Touch
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contact{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Us
            </span>
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about GAMMAT 2026? We&apos;re here to help. Reach out
            to our team for inquiries about registration, sponsorship, speaking
            opportunities, or general information.
          </p>
        </div>
      </section>

      {/* ── Contact Info Grid ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.action || "#"}
                className={`bg-white border border-[#d4d8d0] rounded-xl p-6 text-center transition-all hover:shadow-md ${
                  info.action
                    ? "cursor-pointer hover:border-[#3B6D11]/40"
                    : "cursor-default"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${info.color}18` }}
                >
                  <info.icon
                    className="w-5 h-5"
                    style={{ color: info.color }}
                  />
                </div>
                <h3 className="text-base font-bold text-[#1a2b1a] mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, detailIdx) => (
                  <p
                    key={detailIdx}
                    className="text-sm text-[#4a5a4a] leading-relaxed"
                  >
                    {detail}
                  </p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form & Map ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white border border-[#d4d8d0] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-0.5 bg-[#3B6D11]" />
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                  Send a Message
                </span>
              </div>
              <h2
                className="text-2xl font-black text-[#1a2b1a] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                We&apos;d Love to{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Hear From You
                </span>
              </h2>
              <p className="text-sm text-[#4a5a4a] mb-6">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              {errorMessage ? (
                <div className="mb-4 rounded-lg border border-[#f7caca] bg-[#fff1f1] px-4 py-3 text-sm text-[#9f2a2a]">
                  {errorMessage}
                </div>
              ) : null}

              {submitted ? (
                <div className="bg-[#eaf3de] border border-[#3B6D11]/30 rounded-lg p-6 text-center relative">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="absolute top-4 right-4 text-[#3B6D11]/70 hover:text-[#3B6D11]"
                  >
                    Close
                  </button>
                  <CheckCircle className="w-12 h-12 text-[#3B6D11] mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-[#1a2b1a] mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[#4a5a4a]">
                    Thank you for reaching out. We&apos;ll respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Subject *
                      </label>
                      <Select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-3"
                      >
                        <option value="">Select a subject</option>
                        <option value="Registration Inquiry">
                          Registration Inquiry
                        </option>
                        <option value="Sponsorship Opportunity">
                          Sponsorship Opportunity
                        </option>
                        <option value="Speaking Proposal">
                          Speaking Proposal
                        </option>
                        <option value="Media Accreditation">
                          Media Accreditation
                        </option>
                        <option value="General Question">
                          General Question
                        </option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Map & Location */}
            <div className="space-y-6">
              <div className="bg-white border border-[#d4d8d0] rounded-xl overflow-hidden">
                <div className="h-64 bg-[#eaf3de] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.215916184893!2d3.442176!3d6.468816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4e8a2ef2d9d%3A0x7b1b3d5c9b8b3f8c!2sOriental%20Hotel%20Lagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Oriental Hotel Lagos Location"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1a2b1a] mb-2">
                    Venue Address
                  </h3>
                  <p className="text-sm text-[#4a5a4a]">
                    Oriental Hotel Lagos
                    <br />
                    3 Lekki - Epe Expressway
                    <br />
                    Victoria Island, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="bg-[#0d1a0f] rounded-xl p-5 text-center relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
                  }}
                />
                <h3 className="text-white font-bold mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-white/60 text-sm mb-3">
                  Call our hotline for urgent inquiries
                </p>
                <a
                  href="tel:+2348066626462"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#2d6e2e] rounded-md text-sm font-bold text-white hover:bg-[#3a8a3b] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +234 806 662 6462
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Contacts ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Our Team
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-none font-black text-[#1a2b1a] mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Connect with the{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Right Team
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamContacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#d4d8d0] rounded-xl p-5 hover:border-[#3B6D11]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-3">
                  <contact.icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-sm font-bold text-[#1a2b1a] mb-0.5">
                  {contact.name}
                </h3>
                <p className="text-[11px] text-[#4a5a4a] mb-3">
                  {contact.role}
                </p>
                <div className="space-y-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-xs text-[#3B6D11] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-xs text-[#4a5a4a] hover:text-[#3B6D11] transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Frequently Asked Questions
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-none font-black text-[#1a2b1a] mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Got{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#d4d8d0] rounded-xl p-5 hover:border-[#3B6D11]/40 transition-colors"
              >
                <h3 className="text-sm font-bold text-[#1a2b1a] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#4a5a4a] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Media ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-br from-[#0d1a0f] to-[#1a2b1a] rounded-xl p-10 text-center relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
              }}
            />
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Stay{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Connected
              </span>
            </h2>
            <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
              Follow us on social media for updates, announcements, and
              behind-the-scenes content.
            </p>
            <div className="flex justify-center gap-4">
              <SocialIcon
                url="https://facebook.com/aspirewestafrica"
                bgColor="transparent"
                fgColor="#ffffff"
                style={{ width: 40, height: 40, opacity: 0.6 }}
                className="hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialIcon
                url="https://twitter.com/aspirewestafrica"
                bgColor="transparent"
                fgColor="#ffffff"
                style={{ width: 40, height: 40, opacity: 0.6 }}
                className="hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialIcon
                url="https://linkedin.com/company/aspirewestafrica"
                bgColor="transparent"
                fgColor="#ffffff"
                style={{ width: 40, height: 40, opacity: 0.6 }}
                className="hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialIcon
                url="https://instagram.com/aspirewestafrica"
                bgColor="transparent"
                fgColor="#ffffff"
                style={{ width: 40, height: 40, opacity: 0.6 }}
                className="hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
