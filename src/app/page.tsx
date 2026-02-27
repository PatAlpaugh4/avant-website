import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Differentiators from "@/components/Differentiators";
import Industries from "@/components/Industries";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Problem />
                <Services />
                <HowItWorks />
                <Differentiators />
                <Industries />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
