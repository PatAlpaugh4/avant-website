"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Team.module.css";

const TEAM = [
  {
    name: "Patrick Alpaugh, MBA",
    role: "Co-Founder & CEO",
    bio: "A seasoned analyst in both private equity and venture capital, he has also led sales organizations within PE- and VC-backed companies. In his most recent role he introduced a breakthrough AI-powered inventory counting solution to the largest restaurant groups in Canada\u2014and personally owned and serviced every one of those accounts. Patrick founded this firm to bring that same technical mastery and proven commercial discipline to the Canadian PE/VC market. His mission is simple and urgent: to enable Bay Street to capture the extraordinary value from AI that Wall Street and Silicon Valley have already seized\u2014faster, smarter, and with greater return than anyone else thought possible.",
    image: "/images/team/patrick_headshot.jpeg",
  },
];

export default function Team() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.content}`}>
        <ScrollReveal>
          <p className="section-label">Our Team</p>
          <h2 className="section-title">Meet the Team</h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.name} delay={200 + i * 200}>
              <div className={styles.card}>
                <div className={styles.avatar}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className={styles.headshot}
                  />
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
