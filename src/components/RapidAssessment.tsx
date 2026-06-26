import styles from "./RapidAssessment.module.css";
import { mailto } from "@/lib/contact";
import AuditLifecycle from "@/components/AuditLifecycle";
import ScrollReveal from "@/components/ScrollReveal";

/* ── Marquee deliverables ── */
const DELIVERABLES = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        title: "AI Readiness Scorecard",
        body: "A quantified readiness score across data, tooling, talent, process, and adoption — with a clear gap analysis showing exactly where you stand and what is holding you back.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        title: "Tooling & Enablement Plan",
        body: "The right tools to adopt and integrate for each opportunity, plus hands-on enablement so your team actually uses them — set up with sensible defaults for access and data handling so it stays secure, without a compliance project.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
        ),
        title: "Executive Readout + Roadmap",
        body: "A live readout with your partners and a costed, phased roadmap — sequenced quick-wins first, each with a named owner, so your pilots reach production instead of stalling.",
    },
];

/* ── Methodology ── */
const STEPS = [
    {
        week: "Week 1",
        title: "Discover",
        body: "Structured interviews with 5–7 stakeholders, plus a review of your tech stack, data, and tooling.",
    },
    {
        week: "Week 2",
        title: "Score & prioritize",
        body: "We score your readiness across data, tooling, talent, process and adoption, then rank AI opportunities by business impact and feasibility.",
    },
    {
        week: "Week 3",
        title: "Read out",
        body: "A costed, phased roadmap delivered live to your partners, backed by a written report you can circulate.",
    },
];

/* ── Two tiers (no prices) ── */
const TIERS = [
    {
        name: "Firm Audit",
        audience: "For the investment firm itself.",
        tag: "Most firms start here",
        timeline: "2–3 weeks",
        features: [
            "AI readiness scorecard: data, tooling, talent, process, adoption",
            "Tooling & enablement plan for each opportunity",
            "Ranked AI opportunities across your deal lifecycle",
            "Costed, phased implementation roadmap",
            "Live executive readout + written report",
        ],
        cta: { label: "Scope your audit", href: mailto("AI Audit — Firm Audit") },
        featured: true,
    },
    {
        name: "Portfolio Audit",
        audience: "For PE firms and family offices with portfolio companies.",
        tag: undefined as string | undefined,
        timeline: "3–4 weeks",
        features: [
            "Everything in the Firm Audit",
            "Portfolio-company AI assessment",
            "Value-creation roadmap across portfolio companies",
            "Cross-portfolio benchmarking",
            "Expanded recommendations with timelines",
        ],
        cta: { label: "Scope your audit", href: mailto("AI Audit — Portfolio Audit") },
        featured: false,
    },
];

export default function RapidAssessment() {
    return (
        <section className={`section ${styles.section}`} id="ai-audit">
            <div className="container">
                <ScrollReveal>
                    <AuditLifecycle />
                </ScrollReveal>

                {/* Deliverables */}
                <ScrollReveal delay={100}>
                    <div className={styles.deliverables}>
                        {DELIVERABLES.map((d) => (
                            <div key={d.title} className={styles.deliverable}>
                                <div className={styles.delHead}>
                                    <span className={styles.delMark}>{d.icon}</span>
                                    <h3 className={styles.delTitle}>{d.title}</h3>
                                </div>
                                <p className={styles.delBody}>{d.body}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Methodology */}
                <ScrollReveal>
                    <div className={styles.method}>
                        <h3 className={styles.methodTitle}>How it works</h3>
                        <div className={styles.steps}>
                            {STEPS.map((s, i) => (
                                <div key={s.title} className={styles.step}>
                                    <div className={styles.stepTop}>
                                        <span className={styles.stepNum}>{i + 1}</span>
                                        <span className={styles.stepWeek}>{s.week}</span>
                                    </div>
                                    <h4 className={styles.stepTitle}>{s.title}</h4>
                                    <p className={styles.stepBody}>{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Tiers (no prices) */}
                <ScrollReveal>
                <div className={styles.tiers}>
                    {TIERS.map((tier) => (
                        <div
                            key={tier.name}
                            className={`${styles.tier} ${tier.featured ? styles.tierFeatured : ""}`}
                        >
                            {tier.tag && <span className={styles.badge}>{tier.tag}</span>}

                            <div className={styles.tierHead}>
                                <h3 className={styles.tierName}>{tier.name}</h3>
                                <span className={styles.tierAudience}>{tier.audience}</span>
                            </div>

                            <ul className={styles.features}>
                                {tier.features.map((feature) => (
                                    <li key={feature}>
                                        <svg
                                            className={styles.check}
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.tierFoot}>
                                <span className={styles.priceNote}>
                                    {tier.timeline} · Fixed scope · Pricing on request
                                </span>
                                <a href={tier.cta.href} className={`btn btn--primary ${styles.cta}`}>
                                    {tier.cta.label}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                </ScrollReveal>

                <ScrollReveal>
                {/* Fee-credit banner */}
                <div className={`glass ${styles.feeBanner}`}>
                    The full audit fee is credited toward any implementation you commission
                    afterward. You&apos;re not paying for a report — you&apos;re paying down your
                    build.
                </div>

                {/* Security note */}
                <div className={styles.securityNote}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>
                        Every engagement runs inside your environment. No data leaves your systems.
                    </span>
                </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
