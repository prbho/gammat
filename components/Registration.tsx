"use client";

import { useState, FormEvent } from "react";
import FadeUp from "./FadeUp";
import styles from "./Register.module.css";

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData(e.currentTarget as HTMLFormElement);
    const name = form.get("fullName")?.toString() ?? "";
    const organization = form.get("organization")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const phone = form.get("phone")?.toString() ?? "";

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: organization,
          inquiryType: "Registration Enquiry",
          message: `Registration enquiry from website contact form.\nOrganization: ${organization}\nPhone: ${phone}`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit enquiry.");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Registration enquiry failed:", error);
      alert("There was an error sending your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className={styles.section}>
      <div className={styles.inner}>
        <FadeUp>
          <p className={styles.label}>Registration</p>
          <h2 className={styles.title}>
            Secure Your
            <br />
            <span className={styles.accent}>Delegate Pass</span>
          </h2>
        </FadeUp>

        <div className={styles.grid}>
          {/* Pass options + contact */}
          <FadeUp delay={1}>
            <div className={styles.passes}>
              <div className={`${styles.pass} ${styles.passFeature}`}>
                <div className={styles.passInfo}>
                  <h3>Single Delegate Access</h3>
                  <p>Full summit + seminar + networking</p>
                </div>
                <div className={styles.passRight}>
                  <span className={styles.passPrice}>$25</span>
                  <button className={styles.passBtn}>Register</button>
                </div>
              </div>

              <div className={styles.pass}>
                <div className={styles.passInfo}>
                  <h3>Bloc Access (10 pax)</h3>
                  <p>Group delegate package</p>
                </div>
                <div className={styles.passRight}>
                  <span className={styles.passPrice}>$150</span>
                  <button className={styles.passBtn}>Book Group</button>
                </div>
              </div>
            </div>

            <div className={styles.orgCard}>
              <p className={styles.orgLabel}>Organised By</p>
              <p className={styles.orgName}>Aspire West Africa</p>
              <p className={styles.orgPartner}>In Partnership with ELIAD</p>
              <div className={styles.orgDetails}>
                <p>📍 LF6A DIDI Mall, Lekki, Lagos, Nigeria</p>
                <p>📞 +234 80666 26462</p>
                <p>✉️ info@aspirewestafrica.com</p>
              </div>
            </div>
          </FadeUp>

          {/* Enquiry form */}
          <FadeUp delay={2}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.success}>
                  <span className={styles.successIcon}>✓</span>
                  <h3>Enquiry Received</h3>
                  <p>
                    Thank you! A GAMMAT summit representative will respond
                    within 24 hours.
                    <br />
                    <a href="mailto:info@aspirewestafrica.com">
                      info@aspirewestafrica.com
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  <h3 className={styles.formTitle}>Request Information</h3>
                  <p className={styles.formSub}>
                    Our team will connect you with the right pass or sponsorship
                    option.
                  </p>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Organisation / Company"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.submit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit Enquiry →"}
                    </button>
                    <p className={styles.formNote}>
                      Response within 24 hours · info@aspirewestafrica.com
                    </p>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
