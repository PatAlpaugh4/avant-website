import styles from "./AuditLifecycle.module.css";

/* AI applications mapped across the investment lifecycle (sourcing → exit). */
const STAGES = [
    {
        name: "Sourcing",
        apps: ["Deal identification & screening", "Predictive targeting", "Market intelligence"],
    },
    {
        name: "Due diligence",
        apps: ["Document analysis", "Risk assessment", "Scenario modelling"],
    },
    {
        name: "Investment",
        apps: ["Valuation & forecasting", "Fundraising & LP insights", "Decision support"],
    },
    {
        name: "Management",
        apps: ["Portfolio monitoring", "Talent & HR analytics", "Personalized reporting"],
    },
    {
        name: "Exit",
        apps: ["Buyer identification & targeting", "Exit scenario simulations", "Automated sales materials"],
    },
];

const CX = 210;
const CY = 210;
const R_OUTER = 190;
const R_INNER = 116;
const SEG = 180 / STAGES.length; // 36°

/* Polar → cartesian with 0° at the top, increasing clockwise. */
function polar(r: number, angle: number): [number, number] {
    const a = ((angle - 90) * Math.PI) / 180;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

/* Donut-segment path between two angles (a small gap is left between segments). */
function wedge(start: number, end: number): string {
    const g = 1.3;
    const s = start + g;
    const e = end - g;
    const [osx, osy] = polar(R_OUTER, s);
    const [oex, oey] = polar(R_OUTER, e);
    const [iex, iey] = polar(R_INNER, e);
    const [isx, isy] = polar(R_INNER, s);
    return [
        `M ${osx.toFixed(2)} ${osy.toFixed(2)}`,
        `A ${R_OUTER} ${R_OUTER} 0 0 1 ${oex.toFixed(2)} ${oey.toFixed(2)}`,
        `L ${iex.toFixed(2)} ${iey.toFixed(2)}`,
        `A ${R_INNER} ${R_INNER} 0 0 0 ${isx.toFixed(2)} ${isy.toFixed(2)}`,
        "Z",
    ].join(" ");
}

const [hubLx, hubLy] = polar(R_INNER - 5, -90);
const [hubRx, hubRy] = polar(R_INNER - 5, 90);

export default function AuditLifecycle() {
    return (
        <div className={styles.wrap}>
            <p className={styles.caption}>
                We map where AI delivers the most ROI across your entire investment lifecycle.
            </p>

            <svg
                className={styles.svg}
                viewBox="0 0 420 224"
                role="img"
                aria-label="AI applications across the investment lifecycle: sourcing, due diligence, investment, management, and exit."
            >
                <defs>
                    <linearGradient id="auditArc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6aabef" />
                        <stop offset="100%" stopColor="#3672b5" />
                    </linearGradient>
                </defs>

                {STAGES.map((stage, i) => {
                    const start = -90 + i * SEG;
                    const end = start + SEG;
                    const mid = start + SEG / 2;
                    const [lx, ly] = polar((R_INNER + R_OUTER) / 2, mid);
                    return (
                        <g key={stage.name}>
                            <path d={wedge(start, end)} fill="url(#auditArc)" />
                            <text
                                x={lx.toFixed(2)}
                                y={ly.toFixed(2)}
                                transform={`rotate(${mid} ${lx.toFixed(2)} ${ly.toFixed(2)})`}
                                textAnchor="middle"
                                dominantBaseline="central"
                                className={styles.arcLabel}
                            >
                                {stage.name}
                            </text>
                        </g>
                    );
                })}

                {/* Center hub */}
                <path
                    d={`M ${hubLx.toFixed(2)} ${hubLy.toFixed(2)} A ${R_INNER - 5} ${R_INNER - 5} 0 0 1 ${hubRx.toFixed(2)} ${hubRy.toFixed(2)} Z`}
                    className={styles.hub}
                />
                <text x={CX} y={CY - 38} textAnchor="middle" className={styles.hubText}>AI</text>
                <text x={CX} y={CY - 14} textAnchor="middle" className={styles.hubSub}>Applications</text>
            </svg>

            <div className={styles.stages}>
                {STAGES.map((stage) => (
                    <div key={stage.name} className={styles.stage}>
                        <h4 className={styles.stageName}>{stage.name}</h4>
                        <ul className={styles.apps}>
                            {stage.apps.map((app) => (
                                <li key={app}>{app}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
