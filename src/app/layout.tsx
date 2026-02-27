import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
    title: "Avant | AI Workshops & Implementation for Ontario Businesses",
    description:
        "Avant helps Ontario small and medium businesses move from AI curiosity to measurable operational results. Practical workshops, implementation sprints, and ongoing AI strategy.",
    keywords: [
        "AI consulting Ontario",
        "AI workshop for business",
        "AI implementation SMB",
        "AI automation Ontario",
        "small business AI consulting",
    ],
    openGraph: {
        title: "Avant | AI Workshops & Implementation for Ontario Businesses",
        description:
            "Practical AI workshops and implementation for Ontario SMBs. Walk out with working tools, not just theory.",
        type: "website",
        locale: "en_CA",
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-CA" className={`${outfit.variable} ${dmSans.variable}`}>
            <body>{children}</body>
        </html>
    );
}
