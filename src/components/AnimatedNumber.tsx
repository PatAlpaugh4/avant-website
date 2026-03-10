"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    value: string;
    duration?: number;
}

export default function AnimatedNumber({ value, duration = 1800 }: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState("\u00A0"); // nbsp placeholder
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animate();
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function animate() {
        const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
        if (!match) {
            setDisplay(value);
            return;
        }

        const prefix = match[1];
        const target = parseInt(match[2], 10);
        const suffix = match[3];

        if (target === 0) {
            setDisplay(value);
            return;
        }

        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 4);
            setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    return <span ref={ref}>{display}</span>;
}
