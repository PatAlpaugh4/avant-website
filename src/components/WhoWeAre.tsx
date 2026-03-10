"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./WhoWeAre.module.css";

const OrbitalNetwork = dynamic(() => import("@/components/OrbitalNetwork"), {
    ssr: false,
    loading: () => <div className={styles.orbitalFallback} />,
});

const OFFERINGS = [
    {
        tag: "Implementation",
        title: "AI Implementation Sprints",
        description:
            "We audit your workflows, build custom AI systems that plug into your existing software, and train your team to run them — in weeks, not months.",
    },
    {
        tag: "Leadership",
        title: "Fractional AI Officer",
        description:
            "Ongoing strategic AI leadership without a six-figure hire. Monthly roadmaps, performance monitoring, and new tool evaluations to keep you ahead.",
    },
];

export default function WhoWeAre() {
    return (
        <section className={styles.section}>
            <div className={styles.orbital}>
                <OrbitalNetwork />
            </div>

            <div className={`container ${styles.content}`}>
                <div className={styles.left}>
                    <ScrollReveal>
                        <p className="section-label">Who We Are</p>
                        <h2 className={styles.title}>
                            We implement AI.
                        </h2>
                        <p className={styles.subtitle}>
                            Not decks. Not workshops. Working systems built into
                            your business — tailored to your workflows, your
                            software, your team.
                        </p>
                    </ScrollReveal>

                    <div className={styles.offerings}>
                        {OFFERINGS.map((o, i) => (
                            <ScrollReveal key={o.tag} delay={200 + i * 200}>
                                <div className={styles.offering}>
                                    <span className={styles.offeringTag}>
                                        {o.tag}
                                    </span>
                                    <h3 className={styles.offeringTitle}>
                                        {o.title}
                                    </h3>
                                    <p className={styles.offeringDesc}>
                                        {o.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={700}>
                        <a
                            href="/services"
                            className="btn btn--secondary"
                        >
                            View Services →
                        </a>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
