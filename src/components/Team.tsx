"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Team.module.css";

const TEAM = [
  {
    name: "Patrick Alpaugh, MBA",
    role: "Co-Founder & CEO",
    bio: "Patrick works directly with clients to identify high-impact AI opportunities and turn them into working systems. He brings a sharp focus on measurable outcomes \u2014 if it doesn\u2019t move the needle, it doesn\u2019t make the roadmap.",
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
