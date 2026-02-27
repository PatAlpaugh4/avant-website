import styles from "./HowItWorks.module.css";

const STEPS = [
    {
        number: "01",
        title: "Assessment",
        description:
            "Free 30–45 minute call. We map your tools, workflows, and biggest time sinks. You get a one-page AI Opportunity Summary — no strings attached.",
        outcome: "Know exactly where AI fits in your business",
    },
    {
        number: "02",
        title: "Workshop",
        description:
            "Half-day, hands-on session. Your team leaves with working automations built on your real systems — not slides about what AI could do someday.",
        outcome: "Working tools from day one",
    },
    {
        number: "03",
        title: "Sprint & Scale",
        description:
            "Focused 2–4 week sprints targeting your highest-ROI workflow. Then ongoing retainer support to expand, optimize, and stay ahead.",
        outcome: "Measurable ROI within weeks",
    },
];

export default function HowItWorks() {
    return (
        <section className={`section ${styles.section}`} id="how-it-works">
            <div className="container">
                <p className="section-label">How It Works</p>
                <h2 className="section-title">Three steps. Real results.</h2>
                <p className="section-subtitle">
                    Every engagement starts with understanding your business. We never
                    sell a solution without diagnosing the problem first.
                </p>

                <div className={styles.steps}>
                    {STEPS.map((step) => (
                        <div key={step.number} className={styles.step}>
                            <span className={styles.stepNumber}>{step.number}</span>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.description}</p>
                            <div className={styles.outcome}>
                                <span className={styles.outcomeIcon}>→</span>
                                <span className={styles.outcomeText}>{step.outcome}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
