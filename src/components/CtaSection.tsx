"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "@/app/(frontend)/home.module.css";

const MorphBlob = dynamic(() => import("@/components/MorphBlob"), {
    ssr: false,
    loading: () => <div className={styles.ctaBlobFallback} />,
});

export default function CtaSection() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaBlob}>
                <MorphBlob />
            </div>
            <div className={`container ${styles.ctaContent}`}>
                <ScrollReveal>
                    <h2 className={styles.ctaTitle}>
                        Ready to put AI<br />to work?
                    </h2>
                    <p className={styles.ctaSub}>
                        Start with a free, no-obligation assessment.
                        We&apos;ll map your biggest opportunities and show
                        you exactly where AI fits.
                    </p>
                    <div className={styles.ctaButtons}>
                        <a
                            href="/contact#booking"
                            className={styles.ctaPrimary}
                        >
                            Book Free Assessment
                        </a>
                        <a
                            href="/services"
                            className={styles.ctaPrimary}
                        >
                            Explore Services →
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
