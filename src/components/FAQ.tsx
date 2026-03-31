"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./FAQ.module.css";

const FAQS = [
    {
        q: "Do I need technical staff to use these services?",
        a: "No. Our readiness sessions and sprints are designed for non-technical teams. We handle the setup and integration — your team just needs to show up and learn.",
    },
    {
        q: "What if we already use ChatGPT?",
        a: "Great — you're ahead of most. But basic prompts are just the tip of the iceberg. Our AI Readiness Session shows you how to use ChatGPT and Claude for role-specific workflows, and how to connect AI to your actual business tools through automation.",
    },
    {
        q: "How fast will we see ROI?",
        a: "Teams typically see time savings within the first week of engagement. Sprint implementations deliver measurable ROI within 30 days — we include a scorecard to prove it.",
    },
    {
        q: "How are you different from Deloitte or Accenture?",
        a: "They sell six-month strategy decks with open-ended retainers. We deliver working tools with flat-fee engagements scoped to your actual needs — built for businesses under 200 employees.",
    },
    {
        q: "Is the free assessment actually free?",
        a: "Yes. No strings, no obligation. You get a one-page AI Opportunity Summary with specific recommendations. Most businesses find at least one quick win worth pursuing — but that's your call.",
    },
{
        q: "What tools do you work with?",
        a: "We integrate with whatever you already use: HubSpot, Salesforce, Pipedrive, QuickBooks, Google Workspace, Microsoft 365, Zapier, and more. We don't force you onto new platforms.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className={`section ${styles.section}`} id="faq">
            <div className={`container container--narrow ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">FAQ</p>
                    <h2 className="section-title">Common questions.</h2>
                </ScrollReveal>

                <div className={styles.list}>
                    {FAQS.map((faq, i) => (
                        <ScrollReveal key={i} delay={i * 60}>
                            <button
                                className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                            >
                                <div className={styles.question}>
                                    <span>{faq.q}</span>
                                    <span className={styles.icon} aria-hidden="true">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        >
                                            <line x1="9" y1="3" x2="9" y2="15" className={styles.iconVert} />
                                            <line x1="3" y1="9" x2="15" y2="9" />
                                        </svg>
                                    </span>
                                </div>
                                <div className={styles.answerWrap} aria-hidden={open !== i}>
                                    <p className={styles.answer}>{faq.a}</p>
                                </div>
                            </button>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
