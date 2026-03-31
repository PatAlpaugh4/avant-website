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
                        "@type": "Organization",
                        "@id": "https://www.avantai.ca/#organization",
                        "name": "Avant",
                        "url": "https://www.avantai.ca",
                        "description": "Avant helps Ontario small and medium businesses deploy reliable, secure, and profitable AI systems.",
                        "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
                        "sameAs": []
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://www.avantai.ca/#website",
                        "name": "Avant",
                        "url": "https://www.avantai.ca",
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
