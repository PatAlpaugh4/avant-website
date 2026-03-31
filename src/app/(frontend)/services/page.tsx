import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
    title: "Services",
    description:
        "AI readiness sessions, implementation sprints, and monthly retainers for Ontario businesses. From free assessment to full AI strategy.",
};

export default function ServicesPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <Services />
            <section className="section" style={{ textAlign: "center" }}>
                <div className="container">
                    <h2 className="section-title" style={{ maxWidth: "none" }}>
                        Not sure where to start?
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto var(--space-lg)" }}
                    >
                        Book a free assessment and we&apos;ll recommend the right
                        starting point for your business.
                    </p>
                    <a href="/contact#booking" className="btn btn--primary">
                        Book Free Assessment
                    </a>
                </div>
            </section>
        </>
    );
}
