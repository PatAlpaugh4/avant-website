import styles from "./Differentiators.module.css";

const ATTRIBUTES = [
    { label: "Time to ROI", us: "Weeks", them: "Months" },
    { label: "Implementation", us: "Working tools, day one", them: "Strategy decks" },
    { label: "Investment", us: "Starts free", them: "$50K+" },
    { label: "Focus", us: "Your actual workflows", them: "Generic frameworks" },
    { label: "Commitment", us: "Pay per sprint", them: "6-month contracts" },
    { label: "Location", us: "Ontario-focused", them: "Global, generic" },
];

export default function Differentiators() {
    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <p className="section-label">Why Avant</p>
                <h2 className="section-title">
                    Built for businesses that build Ontario.
                </h2>
                <p className="section-subtitle">
                    Avant means &ldquo;forward&rdquo; — the lead navigator who steered
                    the canoe through rapids. We take the same approach: practical,
                    skilled, and always at the front.
                </p>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <span />
                        <span className={styles.headerUs}>Avant</span>
                        <span className={styles.headerThem}>Big Firms</span>
                    </div>
                    {ATTRIBUTES.map((attr) => (
                        <div key={attr.label} className={styles.tableRow}>
                            <span className={styles.rowLabel}>{attr.label}</span>
                            <span className={styles.rowUs}>{attr.us}</span>
                            <span className={styles.rowThem}>{attr.them}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
