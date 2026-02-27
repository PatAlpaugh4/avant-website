"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQS = [
    {
        q: "Do I need technical staff to use these services?",
        a: "No. Our workshops and sprints are designed for non-technical teams. We handle the setup and integration — your team just needs to show up and learn.",
    },
    {
        q: "What if we already use ChatGPT?",
        a: "Great — you're ahead of most. But basic prompts are just the tip of the iceberg. Our workshop shows you how to use ChatGPT and Claude for role-specific workflows, and how to connect AI to your actual business tools through automation.",
    },
    {
        q: "How fast will we see ROI?",
        a: "Workshop participants typically see time savings within the first week. Sprint implementations deliver measurable ROI within 30 days — we include a scorecard to prove it.",
    },
    {
        q: "How are you different from Deloitte or Accenture?",
        a: "They sell six-month strategy decks for $50K+. We deliver working tools in a half-day workshop for $3,500. Same outcomes, fraction of the cost, built for businesses under 200 employees.",
    },
    {
        q: "Is the free assessment actually free?",
        a: "Yes. No strings, no obligation. You get a one-page AI Opportunity Summary with specific recommendations. Most businesses find at least one quick win worth pursuing — but that's your call.",
    },
    {
        q: "Can you help us get government grants for AI?",
        a: "Absolutely. Our retainer includes government grant navigation — programs like NRC IRAP, Regional AI Initiative, and SR&ED tax credits can offset 50–80% of your AI investment costs.",
    },
    {
        q: "What tools do you work with?",
        a: "We integrate with whatever you already use: HubSpot, Salesforce, Pipedrive, QuickBooks, Google Workspace, Microsoft 365, Zapier, and more. We don't force you onto new platforms.",
    },
    {
        q: "What's the minimum team size for a workshop?",
        a: "5 people for the per-person rate ($500/person). For smaller teams, the $3,500 private session accommodates up to 12 people. Virtual delivery is also available.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className={`section ${styles.section}`} id="faq">
            <div className="container container--narrow">
                <p className="section-label">FAQ</p>
                <h2 className="section-title">Common questions.</h2>

                <div className={styles.list}>
                    {FAQS.map((faq, i) => (
                        <button
                            key={i}
                            className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
                            onClick={() => setOpen(open === i ? null : i)}
                            aria-expanded={open === i}
                        >
                            <div className={styles.question}>
                                <span>{faq.q}</span>
                                <span className={styles.icon}>{open === i ? "−" : "+"}</span>
                            </div>
                            {open === i && <p className={styles.answer}>{faq.a}</p>}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
