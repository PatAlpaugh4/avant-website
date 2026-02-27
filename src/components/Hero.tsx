import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero} id="hero">
            <div className={styles.bgGlow} aria-hidden="true" />
            <div className={styles.grid} aria-hidden="true" />

            <div className={`container ${styles.content}`}>
                <p className="section-label">AI Consulting for Ontario Businesses</p>
                <h1 className={styles.headline}>
                    Move from AI curiosity
                    <br />
                    to <span className={styles.gold}>measurable results.</span>
                </h1>
                <p className={styles.subheadline}>
                    Practical workshops and implementation sprints that give your team
                    working AI tools — not just theory. Built for Ontario businesses with
                    10–200 employees.
                </p>

                <div className={styles.ctas}>
                    <a href="#contact" className="btn btn--primary">
                        Book Free Assessment
                    </a>
                    <a href="#services" className="btn btn--secondary">
                        See Our Services
                    </a>
                </div>

                <div className={styles.trust}>
                    <div className={styles.trustDivider} />
                    <p className={styles.trustText}>
                        Trusted by law firms, healthcare practices, and manufacturers across
                        Ontario
                    </p>
                </div>
            </div>
        </section>
    );
}
