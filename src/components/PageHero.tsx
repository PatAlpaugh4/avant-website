import type { ReactNode } from "react";
import styles from "./PageHero.module.css";

interface Props {
    label: string;
    title: ReactNode;
    subtitle?: ReactNode;
    children?: ReactNode; // actions / proof line
}

/**
 * Left-aligned editorial page hero — echoes the homepage hero's light-weight
 * display type, a subtle top-left accent glow, and a staggered fade-in on load.
 * Pure-CSS entrance (no JS), so it stays a server component.
 */
export default function PageHero({ label, title, subtitle, children }: Props) {
    return (
        <section className={styles.hero}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={`container ${styles.inner}`}>
                <p className={`section-label ${styles.label}`}>{label}</p>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                {children && <div className={styles.cta}>{children}</div>}
            </div>
        </section>
    );
}
