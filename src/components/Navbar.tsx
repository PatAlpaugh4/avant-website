"use client";

import { useState, useEffect, useRef } from "react";
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
    const burgerRef = useRef<HTMLButtonElement>(null);
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

    // Prevent scrolling when menu is open. `overflow: hidden` alone is not
    // reliable on iOS Safari, so pin the body with position: fixed.
    useEffect(() => {
        if (!menuOpen) return;
        const scrollY = window.scrollY;
        const lockedPath = window.location.pathname;
        const { style } = document.body;
        style.position = "fixed";
        style.top = `-${scrollY}px`;
        style.left = "0";
        style.right = "0";
        style.width = "100%";
        style.overflow = "hidden";
        return () => {
            style.position = "";
            style.top = "";
            style.left = "";
            style.right = "";
            style.width = "";
            style.overflow = "";
            // Restore only if the menu closed without navigation;
            // a new page must start at the top.
            if (window.location.pathname === lockedPath) {
                window.scrollTo({ top: scrollY, behavior: "instant" });
            }
            setScrolled(window.scrollY > 40);
        };
    }, [menuOpen]);

    // Close on Escape, returning focus to the toggle
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
                burgerRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    return (
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : scrolled ? styles.scrolled : isHome ? styles.home : ""}`}>
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
                    ref={burgerRef}
                    className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div id="mobile-menu" className={styles.mobileMenu}>
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`${styles.mobileLink} ${pathname === l.href || pathname.startsWith(l.href + "/") ? styles.mobileLinkActive : ""}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <a
                        href={mailto()}
                        className={`btn btn--primary ${styles.mobileCta}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
}
