import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import RapidAssessment from "@/components/RapidAssessment";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { mailto } from "@/lib/contact";
import styles from "./services.module.css";

export const metadata: Metadata = {
    title: "AI Audit for PE, VC & Family Offices",
    description:
        "A rigorous, fixed-scope AI audit for private equity, venture capital, and family offices — readiness scorecard, tooling and enablement plan, ranked opportunities, and a costed roadmap delivered in a live executive readout. Fee credited toward implementation.",
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return (
        <>
            <div className={styles.earthTop}>
                <div className={styles.earthBg} aria-hidden="true">
                    <Image
                        src="/images/earth.jpg"
                        alt=""
                        fill
                        priority
                        quality={75}
                        sizes="100vw"
                        style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    />
                    <div className={styles.earthScrim} />
                </div>
                <div className={styles.earthContent}>
            <PageHero
                label="AI Audit"
                title="A rigorous AI audit of your investment process."
            >
                <a
                    href={mailto("AI Audit")}
                    className="btn btn--primary"
                    style={{ marginTop: "var(--space-lg)" }}
                >
                    Scope your audit
                </a>
            </PageHero>
            <RapidAssessment />
                </div>
            </div>
            <section className="section" style={{ textAlign: "center" }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="section-title" style={{ maxWidth: "none" }}>
                            Not sure which audit fits?
                        </h2>
                        <p
                            className="section-subtitle"
                            style={{ margin: "0 auto var(--space-lg)" }}
                        >
                            Email us a line about your firm and we&apos;ll recommend the
                            right starting point.
                        </p>
                        <a href={mailto("AI Audit — Not sure where to start")} className="btn btn--primary">
                            Email Us
                        </a>
                        <p className="section-subtitle" style={{ margin: "var(--space-lg) auto 0" }}>
                            Ready to build? The audit fee credits toward any{" "}
                            <Link href="/software">custom software</Link> we ship for you.
                        </p>
                    </ScrollReveal>
                </div>
            </section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "AI Audit", "item": "https://www.avantai.ca/services" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "item": {
                                "@type": "Service",
                                "name": "AI Audit — Firm Audit",
                                "description": "A fixed-scope 2-3 week assessment of an investment firm's readiness: a scorecard across data, tooling, talent, process and adoption; a tooling and enablement plan; ranked AI opportunities across the deal lifecycle; and a costed, phased roadmap delivered in a live executive readout. Fee credited toward implementation.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "item": {
                                "@type": "Service",
                                "name": "AI Audit — Portfolio Audit",
                                "description": "Everything in the Firm Audit plus a portfolio-company AI assessment, a value-creation roadmap across portfolio companies, cross-portfolio benchmarking, and expanded recommendations. For PE firms and family offices with portfolio companies.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "item": {
                                "@type": "Service",
                                "name": "Custom AI Implementation",
                                "description": "Bespoke AI systems and workflows built on your playbook and shipped in 2-4 weeks, deployed inside your own environment.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" }
                            }
                        }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What does an AI audit include?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "A readiness scorecard across data, tooling, talent, process and adoption, a tooling and enablement plan, ranked AI opportunities across your deal lifecycle, and a costed, phased implementation roadmap delivered in a live executive readout with a written report."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How long does the audit take?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Two to three weeks for the Firm Audit and three to four weeks for the Portfolio Audit. The scope is fixed, and every engagement ends with a written report and a live executive readout."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Is the audit fee credited toward implementation?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes. The full audit fee is credited toward any implementation you commission afterward — you are paying down your build, not buying a report."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Is our data secure during the audit?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Every engagement runs inside your environment. No documents are uploaded to third parties and no data leaves your systems."
                            }
                        }
                    ]
                }) }}
            />
        </>
    );
}
