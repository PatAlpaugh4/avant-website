"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./WhatWeDo.module.css";

const DataStream = dynamic(() => import("@/components/DataStream"), {
    ssr: false,
    loading: () => <div className={styles.streamFallback} />,
});

const STEPS = [
    {
        title: "Discover",
        description:
            "We map where your team's hours actually go — deal sourcing, IC prep, LP reporting, portfolio monitoring — and pinpoint exactly where AI can create the most leverage.",
    },
    {
        title: "Design",
        description:
            "We architect simple, secure AI workflows around your real process. No bloated platforms. No \"AI strategy\" decks. Just systems your team will actually use.",
    },
    {
        title: "Deliver",
        description:
            "We deploy, train your team hands-on, and stay close until it's adopted. You get leverage through automation, not a pilot that dies out or a forgotten and underused Saas subscription.",
    },
];

export default function WhatWeDo() {
    return (
        <section className={styles.section}>
            <div className={styles.stream}>
                <DataStream />
            </div>

            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">What We Do</p>
                    <h2 className={styles.title}>
                        Discover. Design. Deliver.
                    </h2>
                    <p className={styles.subtitle}>
                        From first conversation to AI inside your investment process.
                    </p>
                </ScrollReveal>

                <div className={styles.steps}>
                    {STEPS.map((step, i) => (
                        <ScrollReveal key={step.title} delay={200 + i * 200}>
                            <div className={styles.step}>
                                <h3 className={styles.stepTitle}>
                                    {step.title}
                                </h3>
                                <p className={styles.stepDesc}>
                                    {step.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
