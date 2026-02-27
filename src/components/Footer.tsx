import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <span className={styles.logo}>AVANT</span>
                    <p className={styles.tagline}>Forward.</p>
                </div>

                <div className={styles.links}>
                    <a href="#services">Services</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#industries">Industries</a>
                    <a href="#faq">FAQ</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Avant. All rights reserved.
                    </p>
                    <p className={styles.location}>Ontario, Canada</p>
                </div>
            </div>
        </footer>
    );
}
