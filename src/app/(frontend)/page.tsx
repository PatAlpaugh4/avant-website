import Hero from "@/components/Hero";
import styles from "./home.module.css";

const PREVIEW_STATS = [
    { value: "78%", label: "of SMBs say AI isn't relevant to them" },
    { value: "5–10h", label: "wasted per employee per week on tasks AI can handle" },
    { value: "$0", label: "ROI from basic ChatGPT prompts most teams use" },
];

const PREVIEW_INDUSTRIES = [
    { icon: "LF", name: "Law Firms", desc: "Automate document collection, follow-ups, and conflict checks." },
    { icon: "HC", name: "Healthcare Clinics", desc: "Handle appointment inquiries and FAQs around the clock." },
    { icon: "MF", name: "Manufacturing", desc: "Streamline hiring paperwork, safety training, and onboarding." },
];

export default function Home() {
    return (
        <>
            <Hero />

            {/* Problem Preview */}
            <section className={`section ${styles.preview}`}>
                <div className="container">
                    <p className="section-label">The Gap</p>
                    <h2 className="section-title">
                        Your team is paying for AI they&apos;re not using.
                    </h2>
                    <div className={styles.stats}>
                        {PREVIEW_STATS.map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <span className={styles.statValue}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                    <a href="/about" className="btn btn--secondary" style={{ marginTop: "var(--space-lg)" }}>
                        Learn Why →
                    </a>
                </div>
            </section>

            {/* Services Preview */}
            <section className={`section ${styles.preview}`}>
                <div className="container">
                    <p className="section-label">Services</p>
                    <h2 className="section-title">
                        A clear path from curiosity to results.
                    </h2>
                    <p className="section-subtitle">
                        From a free assessment to hands-on workshops to full implementation
                        sprints — choose the right starting point for your team.
                    </p>
                    <a href="/services" className="btn btn--primary" style={{ marginTop: "var(--space-lg)" }}>
                        Explore Services →
                    </a>
                </div>
            </section>

            {/* Industries Preview */}
            <section className={`section ${styles.preview}`}>
                <div className="container">
                    <p className="section-label">Who We Help</p>
                    <h2 className="section-title">
                        Built for the businesses that power Ontario.
                    </h2>
                    <div className={styles.industryGrid}>
                        {PREVIEW_INDUSTRIES.map((ind) => (
                            <div key={ind.name} className={`card ${styles.industryCard}`}>
                                <span className={styles.industryIcon}>{ind.icon}</span>
                                <h3 className={styles.industryName}>{ind.name}</h3>
                                <p className={styles.industryDesc}>{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                    <a href="/industries" className="btn btn--secondary" style={{ marginTop: "var(--space-lg)" }}>
                        See All Industries →
                    </a>
                </div>
            </section>

            {/* Final CTA */}
            <section className={`section ${styles.ctaSection}`}>
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 className="section-title" style={{ maxWidth: "none" }}>
                        Ready to put AI to work?
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto var(--space-lg)" }}>
                        Start with a free, no-obligation assessment. We&apos;ll map your
                        biggest opportunities and show you exactly where AI fits.
                    </p>
                    <a href="/contact#booking" className="btn btn--primary">
                        Book Free Assessment
                    </a>
                </div>
            </section>
        </>
    );
}
