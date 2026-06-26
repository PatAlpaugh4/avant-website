import styles from "./Contact.module.css";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, mailto } from "@/lib/contact";

export default function Contact() {
    return (
        <section className={`section ${styles.section}`} id="contact">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>Let&apos;s talk.</h2>
                    <p className={styles.sub}>
                        Tell us about your firm and where you&apos;re losing hours. We&apos;ll reply
                        within one business day.
                    </p>
                    <div className={styles.methods}>
                        <a href={mailto()} className={styles.email}>{CONTACT_EMAIL}</a>
                        <a href={CONTACT_PHONE_TEL} className={styles.phone}>{CONTACT_PHONE}</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
