import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#1a1a1f", // --ls-charcoal, matches body background
};

export const metadata: Metadata = {
    metadataBase: new URL('https://www.avantai.ca'),
    title: {
        default:
            "AI Audits & Implementation for PE, VC & Family Offices | Avant",
        template: "%s | Avant",
    },
    description:
        "Rigorous, fixed-scope AI audits for private equity, venture capital, and family offices — plus fully custom software and hands-on workshops. Built around how your firm actually works, shipped in weeks, not quarters.",
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
    verification: {
        google: 'nTscFUwZvMvOuLbbz4s3ShmHVt_Gh-xNQpZlRENs3n8',
    },
    openGraph: {
        siteName: 'Avant',
        type: 'website',
        locale: 'en_US',
        images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Avant — AI Audits & Implementation for PE, VC & Family Offices' }],
    },
    twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
