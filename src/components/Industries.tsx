"use client";

import { useReveal } from "@/hooks/useReveal";
import styles from "./Industries.module.css";

const INDUSTRIES = [
    {
        name: "Manufacturing & Industrial",
        sprint: "Supply Chain & Maintenance",
        desc: "Streamline safety documentation, equipment maintenance tracking, and supply chain reporting.",
    },
    {
        name: "Law Firms",
        sprint: "Client Intake Accelerator",
        desc: "Automate document collection, follow-ups, and conflict checks. Cut intake time by 70%.",
    },
    {
        name: "Accounting & Finance",
        sprint: "AI Knowledge Base",
        desc: "Instant access to tax codes, procedures, and client histories. New hires productive in days.",
    },
    {
        name: "Real Estate & Property",
        sprint: "Tenant & Lease Workflows",
        desc: "Automate tenant inquiries, lease generation, and maintenance ticketing workflows.",
    },
    {
        name: "Logistics & Supply Chain",
        sprint: "Invoice & Bill Data Extraction",
        desc: "Extract data from varied vendor invoices and bills of lading instantly, eliminating manual entry.",
    },
    {
        name: "Healthcare Clinics",
        sprint: "24/7 Support Agent",
        desc: "Handle appointment inquiries, FAQs, and triage around the clock without adding staff.",
    },
    {
        name: "Engineering & Consulting",
        sprint: "AI Quick-Win Workshop",
        desc: "Get your billable team using AI for proposals, reports, and project scoping.",
    },
    {
        name: "Construction & Trades",
        sprint: "Field Reporting & Bid Analysis",
        desc: "Automate project bidding analysis and safety compliance reporting straight from the field.",
    },
    {
        name: "Insurance Brokerages",
        sprint: "Claims Processing Agent",
        desc: "Accelerate claims processing and policy comparisons using secure internal knowledge bases.",
    },
];

export default function Industries() {
    return (
        <section className={`section ${styles.section}`} id="industries">
            <div className="container">
                <p className="section-label">Who We Help</p>
                <h2 className="section-title">
                    Built for the businesses that power Ontario.
                </h2>
                <p className="section-subtitle">
                    We focus on professional services, healthcare, and manufacturing —
                    industries where back-office AI delivers the fastest ROI.
                </p>

                <div className={styles.grid}>
                    {INDUSTRIES.map((ind) => (
                        <div key={ind.name} className={styles.card}>
                            <h3 className={styles.name}>{ind.name}</h3>
                            <p className={styles.desc}>{ind.desc}</p>
                            <span className={styles.sprint}>Best fit: {ind.sprint}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
