"use client";

import { useState, FormEvent } from "react";
import FadeUp from "./FadeUp";
import styles from "./Register.module.css";

export default function Register() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                    Thank you! A GAMMAT summit representative will respond within 24 hours.
                    <br />
                    <a href="mailto:info@aspirewestafrica.com">info@aspirewestafrica.com</a>
                  </p>
                </div>
              ) : (
                <>
                  <h3 className={styles.formTitle}>Request Information</h3>
                  <p className={styles.formSub}>
                    Our team will connect you with the right pass or sponsorship option.
                  </p>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                      <input type="text" placeholder="Full name" required />
                    </div>
                    <div className={styles.field}>
                      <input type="text" placeholder="Organisation / Company" required />
                    </div>
                    <div className={styles.field}>
                      <input type="email" placeholder="Email address" required />
                    </div>
                    <div className={styles.field}>
                      <input type="tel" placeholder="Phone number" />
                    </div>
                    <button type="submit" className={styles.submit}>
                      Submit Enquiry →
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