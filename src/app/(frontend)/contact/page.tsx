import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact Avant about AI audits, custom software, and workshops for private equity, venture capital, and family offices. Email patricka@avantai.ca or call (705) 984-5337.",
    alternates: { canonical: '/contact' },
};

export default function ContactPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
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
