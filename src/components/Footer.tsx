import Link from "next/link";
import styles from "./Footer.module.css";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, mailto } from "@/lib/contact";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <span className={styles.logo}>AVANT</span>
                    <p className={styles.tagline}>Go Forward.</p>
                    <div className={styles.contact}>
                        <a href={mailto()}>{CONTACT_EMAIL}</a>
                        <a href={CONTACT_PHONE_TEL}>{CONTACT_PHONE}</a>
                    </div>
                </div>

                <div className={styles.links}>
                    <Link href="/services">AI Audit</Link>
                    <Link href="/software">Custom Software</Link>
                    <Link href="/workshops">Workshops</Link>
                    <Link href="/case-studies">Case Studies</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Insights</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Avant. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
