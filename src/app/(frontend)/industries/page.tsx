import type { Metadata } from "next";
import Industries from "@/components/Industries";

export const metadata: Metadata = {
    title: "Industries",
    description:
        "AI solutions for law firms, healthcare clinics, manufacturing, accounting, financial advisory, and engineering firms across Ontario.",
};

export default function IndustriesPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <Industries />
            <section className="section" style={{ textAlign: "center" }}>
                <div className="container">
                    <h2 className="section-title" style={{ maxWidth: "none" }}>
                        See how AI fits your industry.
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto var(--space-lg)" }}
                    >
                        Every industry has different AI opportunities. Let&apos;s find
                        yours.
                    </p>
                    <a href="/contact#booking" className="btn btn--primary">
                        Book Free Assessment
                    </a>
                </div>
            </section>
        </>
    );
}
