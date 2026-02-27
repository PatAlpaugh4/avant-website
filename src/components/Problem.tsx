import styles from "./Problem.module.css";

const STATS = [
    { value: "78%", label: "of SMBs say AI isn't relevant to them" },
    { value: "5–10h", label: "wasted per employee per week on tasks AI can handle" },
    { value: "$0", label: "ROI from the basic ChatGPT prompts most teams use" },
];

export default function Problem() {
    return (
        <section className={`section ${styles.problem}`} id="problem">
            <div className="container">
                <p className="section-label">The Gap</p>
                <h2 className="section-title">
                    Your team is paying for AI they&apos;re not using.
                </h2>
                <p className="section-subtitle">
                    Most Ontario businesses are stuck asking ChatGPT basic questions while
                    paying for AI features in their CRM, email, and office tools that sit
                    untouched. The low-hanging fruit of AI isn&apos;t even on their radar.
                </p>

                <div className={styles.stats}>
                    {STATS.map((s) => (
                        <div key={s.label} className={styles.stat}>
                            <span className={styles.statValue}>{s.value}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.contrast}>
                    <div className={styles.contrastCard}>
                        <h3 className={styles.contrastTitle}>What they offer</h3>
                        <ul className={styles.contrastList}>
                            <li>6-month strategy decks</li>
                            <li>$50K+ consulting fees</li>
                            <li>Generic AI recommendations</li>
                            <li>Teams of juniors</li>
                        </ul>
                    </div>
                    <div className={`${styles.contrastCard} ${styles.contrastCardGold}`}>
                        <h3 className={styles.contrastTitle}>What you actually need</h3>
                        <ul className={styles.contrastList}>
                            <li>Working tools in 4 hours</li>
                            <li>ROI within weeks</li>
                            <li>AI tailored to your workflows</li>
                            <li>Training your team can actually use</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
