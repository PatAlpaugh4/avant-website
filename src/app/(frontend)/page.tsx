import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import FAQ from "@/components/FAQ";
import HomeShell from "@/components/HomeShell";

export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

export default function Home() {
    return (
        <HomeShell>
            <Hero />
            <WhatWeDo />
            <FAQ />
        </HomeShell>
    );
}
