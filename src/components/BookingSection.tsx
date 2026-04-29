import styles from "./BookingSection.module.css";
import { BOOKING_URL } from "@/lib/booking";

export default function BookingSection() {
    return (
        <section className={`section ${styles.section}`} id="booking">
            <div className="container">

                <h2 className="section-title">
                    Schedule your intro call.
                </h2>
                <p className="section-subtitle" style={{ marginBottom: "var(--space-xl)" }}>
                    30 minutes. No obligation. We&apos;ll talk through where AI
                    can compress hours of analyst time across your investment
                    process — and whether there&apos;s a fit to work together.
                </p>

                <div className={styles.wrapper}>
                    <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                    >
                        Book Intro Call
                    </a>
                </div>

                <h2 className={`section-title ${styles.preferEmail}`}>
                    Prefer Email?
                </h2>
            </div>
        </section>
    );
}
