"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Industries", href: "#industries" },
    { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.inner}`}>
                <a href="#" className={styles.logo}>
                    AVANT
                </a>

                {/* Desktop links */}
                <ul className={styles.links}>
                    {NAV_LINKS.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} className={styles.link}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="#contact" className={`btn btn--primary ${styles.cta}`}>
                    Book Free Assessment
                </a>

                {/* Mobile hamburger */}
                <button
                    className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className={styles.mobileLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="btn btn--primary"
                        onClick={() => setMenuOpen(false)}
                        style={{ marginTop: "1rem", width: "100%" }}
                    >
                        Book Free Assessment
                    </a>
                </div>
            )}
        </nav>
    );
}
