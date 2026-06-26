import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import Contact from "@/components/Contact";
import HomeShell from "@/components/HomeShell";

export const metadata: Metadata = {
    title: "AI Audits & Implementation for PE, VC & Family Offices",
    description:
        "Three ways Avant turns AI into an edge for private equity, venture capital, and family offices: a fixed-scope AI audit, fully custom software, and hands-on workshops. Built around how your firm actually works, shipped in weeks.",
    alternates: { canonical: '/' },
};

export default function Home() {
    return (
        <HomeShell>
            <Hero />
            <Offerings />
            <Contact />
        </HomeShell>
    );
}
