import { Outfit, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const dmSans = DM_Sans({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${outfit.variable} ${dmSans.variable}`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "@id": "https://www.avantai.ca/#organization",
                        "name": "Avant",
                        "alternateName": "Avant AI",
                        "url": "https://www.avantai.ca",
                        "logo": "https://www.avantai.ca/images/og-default.png",
                        "image": "https://www.avantai.ca/images/og-default.png",
                        "description": "Avant turns AI into an edge for private equity, venture capital, and family offices — three ways: a fixed-scope AI audit, fully custom software, and hands-on workshops. Built around how your firm actually works, shipped in weeks, not quarters.",
                        "foundingDate": "2026",
                        "founder": {
                            "@type": "Person",
                            "@id": "https://www.avantai.ca/about#patrick",
                            "name": "Patrick Alpaugh"
                        },
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
                            "Deal sourcing automation",
                            "Due diligence acceleration",
                            "IC memo drafting",
                            "LP reporting automation",
                            "Portfolio monitoring",
                            "AI workflow design",
                            "Contract analytics"
                        ],
                        "serviceType": [
                            "AI Audit",
                            "Custom Software Development",
                            "AI Enablement Workshops"
                        ],
                        "sameAs": [
                            "https://www.linkedin.com/in/patrick-alpaugh/",
                            "https://www.linkedin.com/company/avantai/"
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://www.avantai.ca/#website",
                        "name": "Avant",
                        "url": "https://www.avantai.ca",
                        "inLanguage": "en",
                        "publisher": { "@id": "https://www.avantai.ca/#organization" }
                    }
                ]) }}
            />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
