import styles from "./Services.module.css";
import { mailto } from "@/lib/contact";

const STAGES = [
    {
        label: "Discover",
        title: "Discovery & Scoping",
        timeline: "1–2 weeks",
        description:
            "We learn your workflows, data, and goals, then hand you a clear scope and architecture — so you know exactly what we're building and why.",
    },
    {
        label: "Design",
        title: "System Architecture & UX",
        timeline: "2–3 weeks",
        description:
            "We design data models, user flows, and security from the ground up, with AI only where it helps. You review interactive prototypes before we write production code.",
    },
    {
        label: "Build",
        title: "Development & Integration",
        timeline: "4–8 weeks",
        description:
            "We build with production-grade code, add AI only where it earns its place, and deploy on infrastructure you control.",
    },
    {
        label: "Launch",
        title: "Deployment & Training",
        timeline: "1–2 weeks",
        description:
            "We launch, train your team hands-on, and stay on for post-launch support as everyone gets up to speed.",
    },
];

export default function Services() {
    return (
        <section className={`section ${styles.services}`} id="services">
            <div className="container">
                <p className="section-label">How we build</p>
                <h2 className="section-title">
                    From concept to production.
                </h2>
                <p className="section-subtitle">
                    A structured process for building custom software — scoped, designed,
                    and delivered.
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
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: "center", marginTop: "var(--space-xl)" }}>
                    <a href={mailto("Custom Software Inquiry")} className="btn btn--primary">
                        Start a Project
                    </a>
                </div>
            </div>
        </section>
    );
}
