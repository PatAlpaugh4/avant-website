"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const GlobeBackground = dynamic(() => import('./GlobeBackground'), {
  ssr: false,
  loading: () => <div className={styles.heroGlow} />,
});

export default function Hero() {
  return (
    <section className={styles.heroWrapper} aria-label="Introduction">
      <GlobeBackground />
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          Go Forward.
        </h1>
        <p className={styles.subheadline}>
          Put AI where the ROI is &mdash; for private equity, venture capital, and family offices, built around how your firm actually works.
        </p>

        <div className={styles.actionsBlock}>
          <Link href="/services" className={styles.btnPrimary}>
            See the AI Audit
          </Link>
          <Link href="/#what-we-do" className={styles.btnSecondary}>
            See What We Do
          </Link>
        </div>
        <p className={styles.proof}>Find your highest-ROI AI · Build the systems that create value · Make your team fluent.</p>
      </div>
    </section>
  );
}
