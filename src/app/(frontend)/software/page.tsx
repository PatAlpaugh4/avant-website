import type { Metadata } from "next";
import Link from "next/link";
import ValueTriangle from "@/components/ValueTriangle";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { mailto } from "@/lib/contact";
import styles from "./software.module.css";

export const metadata: Metadata = {
    title: "Custom Software for Dedicated Workflows",
    description:
        "Fully custom software built around one workflow — internal tools, dashboards, automations, and apps. AI-enabled where it helps or with no AI at all, running securely in the cloud you control or entirely on-device. Built for any team.",
    alternates: { canonical: "/software" },
};

const DIFFERENTIATORS = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        title: "AI when it helps — not when it doesn't",
        body: "We build with or without AI. If a job is better done by clean, dependable software, that’s what you get — a great fit for teams that don’t live in Claude or ChatGPT.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="13" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="7" x2="6.01" y2="7" />
                <line x1="6" y1="17" x2="6.01" y2="17" />
            </svg>
        ),
        title: "Cloud or fully on-device",
        body: "Deploy securely on infrastructure you control, or run it entirely local on your own machines. Your data stays exactly where you want it.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        title: "Built for one workflow",
        body: "Dedicated software shaped around a single process — not a bloated platform you bend to fit. Less software, used more.",
    },
];

export default function SoftwarePage() {
    return (
        <>
            {/* Hero */}
            <PageHero
                label="Custom Software"
                title="Turn AI into your third value-creation lever."
                subtitle="Private equity creates value three ways — financial engineering, operational excellence, and, increasingly, AI. We build the third: custom software that accelerates returns and becomes an operating lever across your portfolio companies. The same playbook works for any team."
            >
                <div className={styles.actions}>
                    <a href={mailto("Custom Software Inquiry")} className="btn btn--primary">
                        Start a Project
                    </a>
                    <Link href="/case-studies" className="btn btn--secondary">
                        See Our Work
                    </Link>
                </div>
            </PageHero>

            {/* Value creation — the three levers */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                    <div className={styles.valueGrid}>
                        <ValueTriangle />

                        <div className={styles.levers}>
                            <div className={styles.lever}>
                                <h3 className={styles.leverName}>Financial engineering</h3>
                                <p className={styles.leverBody}>
                                    Capital structure, leverage, and timing.
                                </p>
                            </div>
                            <div className={styles.lever}>
                                <h3 className={styles.leverName}>Operational excellence</h3>
                                <p className={styles.leverBody}>
                                    Sharper processes, margins, and management.
                                </p>
                            </div>
                            <div className={`${styles.lever} ${styles.leverActive}`}>
                                <h3 className={styles.leverName}>AI applications — what we build</h3>
                                <p className={styles.leverBody}>
                                    Custom software that puts AI to work where it pays: KPI dashboards
                                    and reporting, workflow and document automation, and clean data
                                    pipelines. AI-driven automation can lift margins 10%+, and 84% of
                                    PE funds expect AI to transform their business.
                                </p>
                                <span className={styles.source}>Source: EY</span>
                            </div>
                        </div>
                    </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Differentiators — editorial rows */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <p className="section-label">What sets us apart</p>
                        <h2 className="section-title">Software built around your workflow — not the other way around.</h2>
                    </ScrollReveal>
                    <div className={styles.diffRows}>
                        {DIFFERENTIATORS.map((d, i) => (
                            <ScrollReveal key={d.title} delay={i * 80}>
                                <div className={styles.diffRow}>
                                    <span className={styles.diffIndex}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className={styles.diffText}>
                                        <h3 className={styles.diffTitle}>{d.title}</h3>
                                        <p className={styles.diffBody}>{d.body}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "Custom Software", "item": "https://www.avantai.ca/software" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Custom Software Development",
                    "description": "Fully custom software built around a dedicated workflow — internal tools, dashboards, automations, CRMs, and apps. AI-enabled where it helps or with no AI at all, deployed securely in the cloud or entirely on-device. For any team.",
                    "provider": { "@id": "https://www.avantai.ca/#organization" },
                    "serviceType": "Custom software development"
                }) }}
            />
        </>
    );
}
