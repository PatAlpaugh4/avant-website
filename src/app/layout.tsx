import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default:
            "Landship | AI Workshops & Implementation for Ontario Businesses",
        template: "%s | Landship",
    },
    description:
        "Landship helps Ontario small and medium businesses move from AI curiosity to measurable operational results.",
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-CA">
            <body>{children}</body>
        </html>
    );
}
