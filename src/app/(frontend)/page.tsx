import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import FAQ from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import HomeShell from "@/components/HomeShell";

export default function Home() {
    return (
        <HomeShell>
            <Hero />
            <WhoWeAre />
            <WhatWeDo />
            <FAQ />
            <CtaSection />
        </HomeShell>
    );
}
