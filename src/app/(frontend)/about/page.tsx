import type { Metadata } from "next";
import Team from "@/components/Team";

export const metadata: Metadata = {
    title: "About Avant — AI Implementation for Canadian PE, VC & Family Offices",
    description:
        "Meet Patrick Alpaugh, Founder & CEO of Avant — an AI implementation consultant for Canadian private equity, venture capital, and family offices. Our approach, process, and what makes us different from big consulting firms.",
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <>
            <Team />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.avantai.ca/about" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "@id": "https://www.avantai.ca/about#patrick",
                        "name": "Patrick Alpaugh",
                        "givenName": "Patrick",
                        "familyName": "Alpaugh",
                        "honorificSuffix": "MBA",
                        "jobTitle": "Founder & CEO",
                        "description": "Founder and CEO of Avant, an AI implementation consultancy for Canadian private equity, venture capital, and family offices. Former analyst at Massey Capital (Canadian PE) and Redstick Ventures (VC); led the Canadian rollout of Nomad Go's Spatial AI inventory product to the country's largest restaurant brands before founding Avant.",
                        "image": "https://www.avantai.ca/images/team/patrick_headshot.jpeg",
                        "worksFor": { "@type": "Organization", "@id": "https://www.avantai.ca/#organization" },
                        "alumniOf": [
                            {
                                "@type": "EducationalOrganization",
                                "name": "University of Windsor — Odette School of Business",
                                "sameAs": "https://www.uwindsor.ca/odette/"
                            },
                            {
                                "@type": "EducationalOrganization",
                                "name": "Wilfrid Laurier University",
                                "sameAs": "https://www.wlu.ca/"
                            }
                        ],
                        "url": "https://www.avantai.ca/about",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "London",
                            "addressRegion": "ON",
                            "addressCountry": "CA"
                        },
                        "knowsAbout": [
                            "AI implementation",
                            "Claude enablement",
                            "Private equity",
                            "Venture capital",
                            "Family offices",
                            "Deal-team operations",
                            "AI workflow design",
                            "Investor memos",
                            "Due diligence",
                            "Restaurant technology",
                            "Spatial AI"
                        ],
                        "knowsLanguage": "en",
                        "nationality": { "@type": "Country", "name": "Canada" },
                        "sameAs": ["https://www.linkedin.com/in/patrick-alpaugh/"]
                    }
                ]) }}
            />
        </>
    );
}
