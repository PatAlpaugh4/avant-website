"use client";

import { useState } from "react";
import styles from "./Services.module.css";

const STAGES = [
    {
        label: "Explore",
        title: "AI Opportunity Assessment",
        timeline: "30–45 min",
        description:
            "A diagnostic call where we review your current tools and workflows, identify your top three automation opportunities, and estimate ROI. You get a one-page AI Opportunity Summary within 48 hours — whether or not you work with us.",
        cta: "Book Your Assessment",
        ctaHref: "#contact",
    },
    {
        label: "Learn",
        title: "AI Readiness Session",
        timeline: "Half day",
        description:
            "A hands-on session where your team leaves with working AI tools, not just concepts. Three modules: activate AI you're already paying for, build your first AI assistant, and create live automations connecting your core tools.",
        details: [
            "Activate AI features in QuickBooks, your CRM, Copilot, or Google Workspace",
            "Hands-on with ChatGPT and Claude for email, documents, and meetings",
            "Build 2–3 live Zapier workflows during the session",
            "Personalized AI Action Plan within 48 hours",
        ],
        cta: "Book a Conversation",
        ctaHref: "#contact",
    },
    {
        label: "Implement",
        title: "AI Implementation Sprints",
        timeline: "2–4 weeks per sprint",
        description:
            "Focused engagements that solve one specific workflow problem. Every sprint: audit (week 1), build (week 2), train (week 3), optimize (week 4). Includes working system, team training, and 30-day ROI scorecard.",
        sprints: [
            {
                name: "AI Knowledge Base",
                desc: "Internal AI assistant trained on your company documents and SOPs. Target: new employee ramp time cut in half.",
            },
            {
                name: "24/7 Support Agent",
                desc: "AI customer support that handles common inquiries around the clock. Target: 50%+ queries resolved without a human.",
            },
            {
                name: "CRM Intelligence Upgrade",
                desc: "Activate AI in your CRM — lead scoring, deal predictions, automated follow-ups. Target: 25–30% conversion improvement.",
            },
            {
                name: "Client Intake Accelerator",
                desc: "AI-powered intake with smart forms, automated document collection, and CRM integration. Target: 70% faster intake.",
            },
            {
                name: "HR & Onboarding Automation",
                desc: "Automated onboarding sequences and employee FAQ bot. Target: onboarding from 2 weeks to 2 days.",
            },
        ],
        cta: "Contact for Proposal",
        ctaHref: "#contact",
    },
    {
        label: "Grow",
        title: "Monthly AI Retainer",
        timeline: "Ongoing partnership",
        description:
            "Fractional Chief AI Officer support. Monthly roadmap reviews, performance monitoring, new tool evaluations, team training, and government grant navigation to offset 50–80% of your AI investment.",
        cta: "Contact for Proposal",
        ctaHref: "#contact",
    },
];

export default function Services() {
    const [expandedSprint, setExpandedSprint] = useState<number | null>(null);

    return (
        <section className={`section ${styles.services}`} id="services">
            <div className="container">
                <p className="section-label">Services</p>
                <h2 className="section-title">
                    A clear path from curiosity to results.
                </h2>
                <p className="section-subtitle">
                    No obligation to progress through every stage. We recommend the right
                    starting point based on your assessment.
                </p>

                <div className={styles.ladder}>
                    {STAGES.map((stage, i) => (
                        <div key={stage.label} className={styles.stage}>
                            <div className={styles.stageIndicator}>
                                <span className={styles.stageNumber}>{i + 1}</span>
                                {i < STAGES.length - 1 && (
                                    <div className={styles.stageLine} />
                                )}
                            </div>

                            <div className={`card ${styles.stageCard}`}>
                                <div className={styles.stageHeader}>
                                    <span className={styles.stageLabel}>{stage.label}</span>
                                    <div>
                                        <h3 className={styles.stageTitle}>{stage.title}</h3>
                                        <div className={styles.stageMeta}>
                                            <span className={styles.stageTimeline}>
                                                {stage.timeline}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className={styles.stageDesc}>{stage.description}</p>

                                {stage.details && (
                                    <ul className={styles.details}>
                                        {stage.details.map((d) => (
                                            <li key={d}>{d}</li>
                                        ))}
                                    </ul>
                                )}

                                {stage.sprints && (
                                    <div className={styles.sprints}>
                                        {stage.sprints.map((sprint, si) => (
                                            <button
                                                key={sprint.name}
                                                className={`${styles.sprint} ${expandedSprint === si ? styles.sprintOpen : ""}`}
                                                onClick={() =>
                                                    setExpandedSprint(expandedSprint === si ? null : si)
                                                }
                                            >
                                                <div className={styles.sprintHeader}>
                                                    <span className={styles.sprintName}>
                                                        {sprint.name}
                                                    </span>
                                                </div>
                                                {expandedSprint === si && (
                                                    <p className={styles.sprintDesc}>{sprint.desc}</p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <a href={stage.ctaHref} className="btn btn--secondary">
                                    {stage.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
