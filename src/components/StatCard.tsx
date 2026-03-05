"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./StatCard.module.css";

/* ── Inline SVG icons (no emoji, crisp at any size) ── */
const ICONS: Record<string, ReactNode> = {
    alert: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    clock: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    "trending-down": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
        </svg>
    ),
};

interface Props {
    value: string;
    label: string;
    description: string;
    icon: string;
    ring?: number; // 0–100 for the progress ring fill percentage
    delay?: number;
}

/**
 * A visually rich stat card with:
 * - Animated circular progress ring
 * - Large animated number
 * - Description text
 * - Scroll-triggered entrance
 */
export default function StatCard({ value, label, description, icon, ring = 0, delay = 0 }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [displayValue, setDisplayValue] = useState(value);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    setTimeout(() => {
                        setVisible(true);
                        animateValue();
                    }, delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    function animateValue() {
        const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
        if (!match) return;

        const prefix = match[1];
        const target = parseInt(match[2], 10);
        const suffix = match[3];
        const duration = 1400;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplayValue(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    // SVG circle math
    const RADIUS = 38;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const offset = CIRCUMFERENCE - (ring / 100) * CIRCUMFERENCE;

    return (
        <div
            ref={ref}
            className={`${styles.card} ${visible ? styles.visible : ""}`}
        >
            {/* Progress ring */}
            <div className={styles.ringContainer}>
                <svg className={styles.ring} viewBox="0 0 88 88">
                    <circle
                        className={styles.ringBg}
                        cx="44" cy="44" r={RADIUS}
                        fill="none" strokeWidth="3"
                    />
                    <circle
                        className={styles.ringFill}
                        cx="44" cy="44" r={RADIUS}
                        fill="none" strokeWidth="3"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={visible ? offset : CIRCUMFERENCE}
                        strokeLinecap="round"
                    />
                </svg>
                <span className={styles.ringIcon}>{ICONS[icon] ?? icon}</span>
            </div>

            {/* Value */}
            <span className={styles.value}>{displayValue}</span>
            <span className={styles.label}>{label}</span>
            <p className={styles.description}>{description}</p>
        </div>
    );
}
