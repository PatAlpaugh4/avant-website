"use client";

import styles from "./BookingSection.module.css";

const BOOKING_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL;

export default function BookingSection() {
    return (
        <section className={`section ${styles.section}`} id="booking">
            <div className="container">

                <h2 className="section-title">
                    Schedule your free AI Opportunity Assessment.
                </h2>
                <p className="section-subtitle" style={{ marginBottom: "var(--space-xl)" }}>
                    30–45 minutes. No obligation. You&apos;ll get a one-page AI
                    Opportunity Summary with your top three automation opportunities
                    and estimated ROI — whether or not you work with us.
                </p>

                <div className={styles.wrapper}>
                    {BOOKING_URL ? (
                        <div className={styles.iframeContainer}>
                            <iframe
                                src={BOOKING_URL}
                                className={styles.iframe}
                                title="Book an appointment"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <div className={styles.fallback}>
                            <p>
                                Booking calendar is not configured yet.
                                <br />
                                Set <code>NEXT_PUBLIC_GOOGLE_BOOKING_URL</code> in your <code>.env.local</code> file.
                            </p>
                        </div>
                    )}
                </div>

                <h2 className={`section-title ${styles.preferEmail}`}>
                    Prefer Email?
                </h2>
            </div>
        </section>
    );
}
