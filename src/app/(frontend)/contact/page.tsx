import type { Metadata } from "next";
import Contact from "@/components/Contact";
import BookingSection from "@/components/BookingSection";

export const metadata: Metadata = {
    title: "Book an Intro Call",
    description:
        "Book an intro call for your Canadian PE, VC firm, or family office. Contact Avant to discuss AI implementation, Claude enablement, and workflow design.",
    alternates: { canonical: '/contact' },
};

export default function ContactPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <BookingSection />
            <Contact />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.avantai.ca/contact" }
                    ]
                }) }}
            />
        </>
    );
}
