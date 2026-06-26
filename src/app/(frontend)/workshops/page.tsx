import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { mailto, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/contact";
import styles from "./workshops.module.css";

export const metadata: Metadata = {
    title: "AI Enablement Workshops for Investment Teams",
    description:
        "Hands-on AI workshops that build practical, compliant AI capability inside your fund's existing teams and tools — from analysts to partners — for faster sourcing, diligence, and decisions. No new vendor to approve.",
    alternates: { canonical: "/workshops" },
};

const STATS = [
    {
        num: "40%",
        label: "better work from AI-fluent teams",
        body: "In a Harvard–BCG study, people using AI produced 40% higher-quality work, 25% faster — and the gains grew with skill.",
    },
    {
        num: "2×",
        label: "more likely to see real AI ROI",
        body: "Firms that build AI fluency report significant returns about twice as often as those that just buy the tools.",
    },
    {
        num: "65%",
        label: "of employees get no AI training",
        body: "Most teams get the tools and no guidance — leaving returns unclaimed and pushing usage into ungoverned “shadow AI.”",
    },
];

const DELIVERS = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: "Inside tools you've already cleared",
        body: "We work in the systems your firm already approved — Copilot, a custom GPT, Claude or ChatGPT Enterprise. Nothing new to procure.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        title: "Anchored to real work, by role",
        body: "Everyone builds against their own live deals — not toy examples.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        title: "Security and judgment, built in",
        body: "We teach the boundaries — MNPI, confidential deal data, where your data lines sit — turning shadow usage into governed practice.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        title: "Capability that stays",
        body: "Teams leave with templates, prompt patterns, and a repeatable playbook they keep using.",
    },
];

export default function WorkshopsPage() {
    return (
        <>
            {/* Hero */}
            <PageHero
                label="Workshops"
                title="Your edge isn't the tool. It's how well your team uses it."
                subtitle="Hands-on AI workshops that build real capability inside the tools your firm already uses — no new vendor to approve. We train your team, from analysts to partners, to apply AI securely in systems you've already cleared."
            >
                <div className={styles.actions}>
                    <a href={mailto("Workshop Inquiry")} className="btn btn--primary">
                        Book a workshop
                    </a>
                </div>
                <p className={styles.proof}>
                    88% of firms use AI. Only 39% see the upside. The gap is fluency.
                </p>
            </PageHero>

            {/* Why enablement beats tooling */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <p className="section-label">Why this works</p>
                        <h2 className="section-title">In private markets, fluency is the edge — not access.</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className={styles.statBand}>
                            {STATS.map((s) => (
                                <div key={s.num} className={styles.statItem}>
                                    <span className={styles.statNum}>{s.num}</span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                    <p className={styles.statBody}>{s.body}</p>
                                </div>
                            ))}
                        </div>
                        <p className={styles.statsSource}>Sources: Harvard/BCG, DataCamp, Bright Horizons.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* What the workshops do — with the by-role strip folded in */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <p className="section-label">What we do</p>
                        <h2 className="section-title">Hands-on, inside your real work.</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className={styles.doGrid}>
                            {DELIVERS.map((d) => (
                                <div key={d.title} className={styles.do}>
                                    <div className={styles.doHead}>
                                        <span className={styles.doMark}>{d.icon}</span>
                                        <h3 className={styles.doTitle}>{d.title}</h3>
                                    </div>
                                    <p className={styles.doBody}>{d.body}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="section" style={{ textAlign: "center" }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="section-title" style={{ maxWidth: "none" }}>
                            Bring a workshop to your team.
                        </h2>
                        <p className="section-subtitle" style={{ margin: "0 auto var(--space-lg)" }}>
                            Tell us your stack and your team, and we&apos;ll tailor a session to your live
                            work.
                        </p>
                        <div className={styles.actions} style={{ justifyContent: "center" }}>
                            <a href={mailto("Workshop Inquiry")} className="btn btn--primary">
                                Email Us
                            </a>
                            <a href={CONTACT_PHONE_TEL} className="btn btn--secondary">
                                {CONTACT_PHONE}
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "Workshops", "item": "https://www.avantai.ca/workshops" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "AI Enablement Workshops",
                    "description": "Hands-on AI enablement workshops that build practical, compliant AI capability inside an investment firm's existing teams and tools — from analysts to partners — without onboarding a new vendor.",
                    "provider": { "@id": "https://www.avantai.ca/#organization" },
                    "serviceType": "AI training and enablement"
                }) }}
            />
        </>
    );
}
