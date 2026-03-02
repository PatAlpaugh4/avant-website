import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <span className={styles.logo}>LANDSHIP</span>
                    <p className={styles.tagline}>Built for the terrain ahead.</p>
                </div>

                <div className={styles.links}>
                    <Link href="/services">Services</Link>
                    <Link href="/about">About</Link>
                    <Link href="/industries">Industries</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Landship. All rights reserved.
                    </p>
                    <p className={styles.location}>Ontario, Canada</p>
                </div>
            </div>
        </footer>
    );
}
