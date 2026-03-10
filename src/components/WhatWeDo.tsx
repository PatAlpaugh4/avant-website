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
        title: "Audit",
        description:
            "We map your operations and find the highest-ROI automation opportunities — so you skip the expensive trial-and-error.",
    },
    {
        title: "Integrate",
        description:
            "We connect AI directly to your CRMs, ERPs, and databases. Your existing software gets smarter — not replaced.",
    },
    {
        title: "Deploy",
        description:
            "We build custom AI agents, deploy them into your workflows, and train your team to manage them independently.",
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
                        Audit. Integrate. Deploy.
                    </h2>
                    <p className={styles.subtitle}>
                        Three steps from AI curiosity to working systems inside
                        your business.
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
