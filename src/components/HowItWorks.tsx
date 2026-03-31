"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./HowItWorks.module.css";

const DataStream = dynamic(() => import("@/components/DataStream"), {
    ssr: false,
    loading: () => <div className={styles.streamFallback} />,
});

const STEPS = [
    {
        number: "01",
        title: "Engagement",
        description:
            "We connect and align on what you're trying to solve.",
        outcome: "Clarity on goals and expectations",
    },
    {
        number: "02",
        title: "Discovery",
        description:
            "We dig into your operations, workflows, and pain points.",
        outcome: "Deep understanding of your business",
    },
    {
        number: "03",
        title: "Assessment",
        description:
            "We identify the highest-leverage AI opportunities specific to your business.",
        outcome: "Prioritized AI roadmap tailored to your workflows",
    },
    {
        number: "04",
        title: "Proposal",
        description:
            "You receive a flat-fee proposal with clear options and measurable outcomes.",
        outcome: "A concrete plan with no surprises",
    },
];

export default function HowItWorks() {
    return (
        <section className={styles.section} id="how-it-works">
            <div className={styles.stream}>
                <DataStream />
            </div>

            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">How It Works</p>
                    <h2 className={styles.title}>Four steps. Real results.</h2>
                    <p className={styles.subtitle}>
                        Every engagement starts with understanding your business. We never
                        sell a solution without diagnosing the problem first.
                    </p>
                </ScrollReveal>

                <div className={styles.timeline}>
                    {STEPS.map((step, i) => (
                        <ScrollReveal key={step.number} delay={200 + i * 250}>
                            <div className={styles.step}>
                                <div className={styles.stepLeft}>
                                    <span className={styles.stepNumber}>{step.number}</span>
                                </div>
                                <div className={styles.stepLine}>
                                    <span className={styles.stepDot} />
                                    {i < STEPS.length - 1 && (
                                        <span className={styles.stepConnector} />
                                    )}
                                </div>
                                <div className={styles.stepRight}>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.description}</p>
                                    <div className={styles.outcome}>
                                        <span className={styles.outcomeIcon}>→</span>
                                        <span className={styles.outcomeText}>{step.outcome}</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
