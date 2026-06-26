import styles from "./ValueTriangle.module.css";

/*
 * Portfolio-company value-creation levers.
 * Point-up triangle split into three sub-triangles from the centroid:
 *   T  = (200, 24)   top
 *   BL = (32, 332)   bottom-left
 *   BR = (368, 332)  bottom-right
 *   C  = (200, 229)  centroid
 * AI applications (bottom) is accent-highlighted as the lever Avant builds.
 */
export default function ValueTriangle() {
    return (
        <svg
            className={styles.svg}
            viewBox="0 0 400 360"
            role="img"
            aria-label="Portfolio-company value-creation levers: financial engineering, operational excellence, and AI applications."
        >
            <polygon className={styles.finEng} points="200,24 32,332 200,229" />
            <polygon className={styles.opEx} points="200,24 368,332 200,229" />
            <polygon className={styles.aiApps} points="32,332 368,332 200,229" />

            <text
                x="134"
                y="190"
                transform="rotate(-61 134 190)"
                textAnchor="middle"
                className={styles.edgeLabel}
            >
                Financial engineering
            </text>
            <text
                x="266"
                y="190"
                transform="rotate(61 266 190)"
                textAnchor="middle"
                className={styles.edgeLabel}
            >
                Operational excellence
            </text>
            <text x="200" y="316" textAnchor="middle" className={styles.edgeLabelStrong}>
                AI applications
            </text>

            <circle cx="200" cy="229" r="62" className={styles.hub} />
            <text x="200" y="229" textAnchor="middle" className={styles.hubText}>
                <tspan x="200" dy="-1em">Port Co</tspan>
                <tspan x="200" dy="1.2em">value-creation</tspan>
                <tspan x="200" dy="1.2em">levers</tspan>
            </text>
        </svg>
    );
}
