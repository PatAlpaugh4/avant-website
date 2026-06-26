"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { mailto } from "@/lib/contact";

const NAV_LINKS = [
    { label: "AI Audit", href: "/services" },
    { label: "Custom Software", href: "/software" },
    { label: "Workshops", href: "/workshops" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : isHome ? styles.home : ""}`}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    AVANT
                </Link>

                {/* Desktop links */}
                <ul className={styles.links}>
                    {NAV_LINKS.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className={`${styles.link} ${pathname === l.href || pathname.startsWith(l.href + "/") ? styles.linkActive : ""}`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <a href={mailto()} className={styles.cta}>
                    Contact
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
                        <Link
                            key={l.href}
                            href={l.href}
                            className={styles.mobileLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <a
                        href={mailto()}
                        className="btn btn--primary"
                        onClick={() => setMenuOpen(false)}
                        style={{ marginTop: "1rem", width: "100%" }}
                    >
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
}
