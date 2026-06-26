"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Offerings.module.css";

const DataStream = dynamic(() => import("@/components/DataStream"), {
    ssr: false,
    loading: () => <div className={styles.streamFallback} />,
});

const OFFERINGS = [
    {
        label: "AI Audit",
        href: "/services",
        title: "Find your highest-ROI AI.",
        body: "A fixed-scope audit for investment firms — a readiness scorecard, ranked opportunities, and a costed roadmap. The fee credits toward any build you commission.",
        cta: "Explore the AI Audit",
    },
    {
        label: "Custom Software",
        href: "/software",
        title: "Build the systems that create value.",
        body: "Fully custom software for a dedicated workflow — internal tools, dashboards, and automations. AI-optional, cloud or local, built for any team.",
        cta: "Explore Custom Software",
    },
    {
        label: "Workshops",
        href: "/workshops",
        title: "Make AI your team's edge.",
        body: "Hands-on AI enablement workshops for analysts to partners — inside the tools you've already approved. Compliant adoption in weeks, not quarters.",
        cta: "Explore workshops",
    },
];

export default function Offerings() {
    return (
        <section id="what-we-do" className={`section ${styles.section}`}>
            <div className={styles.stream}>
                <DataStream />
            </div>

            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">What we do</p>
                    <h2 className="section-title">How we help.</h2>
                    <p className="section-subtitle">
                        Three ways we turn AI into an edge for investment firms — find your highest-ROI AI, build the systems that create value, and make your team fluent.
                    </p>
                </ScrollReveal>

                <div className={styles.grid}>
                    {OFFERINGS.map((o, i) => (
                        <ScrollReveal key={o.href} delay={150 + i * 150}>
                            <Link href={o.href} className={styles.card}>
                                <p className={styles.cardLabel}>{o.label}</p>
                                <h3 className={styles.cardTitle}>{o.title}</h3>
                                <p className={styles.cardBody}>{o.body}</p>
                                <span className={styles.cardCta}>{o.cta} →</span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
