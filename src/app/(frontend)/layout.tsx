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
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
