"use client";

import { useState } from "react";
import { useDemoContext } from "./DemoContext";
import { BOOKING_URL } from "@/lib/booking";
import styles from "./DemoCta.module.css";

export default function DemoCta() {
  const { state, dispatch } = useDemoContext();
  const [dismissed, setDismissed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  function handleExplore() {
    setShowOverlay(false);
  }

  function handleCtaClick(e: React.MouseEvent) {
    e.preventDefault();
    // Track CTA click
    if (state.leadId) {
      fetch("/api/demo/save-lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: state.leadId, ctaClicked: true, tourCompleted: true }),
      }).catch(() => {});
    }
    setShowOverlay(false);
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  }

  function handleDismissBar() {
    setDismissed(true);
    dispatch({ type: "HIDE_CTA" });
  }

  function handleFloatingCtaClick(e: React.MouseEvent) {
    e.preventDefault();
    if (state.leadId) {
      fetch("/api/demo/save-lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: state.leadId, ctaClicked: true }),
      }).catch(() => {});
    }
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* Full-screen overlay CTA */}
      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.divider} />
            <h2 className={styles.headline}>
              Impressed? This took us a few seconds.
            </h2>
            <p className={styles.subheadline}>
              Imagine what we can build after actually understanding your business.
              A 30-minute discovery call is all it takes.
            </p>
            <div className={styles.actions}>
              <button
                className={styles.btnPrimary}
                onClick={handleCtaClick}
              >
                Book a Discovery Call
              </button>
              <button
                className={styles.btnSecondary}
                onClick={handleExplore}
              >
                Keep Exploring
              </button>
            </div>
            <p className={styles.fine}>
              Free. No obligation. You&apos;ll walk away with actionable AI insights either way.
            </p>
          </div>
        </div>
      )}

      {/* Persistent floating bar */}
      {!showOverlay && !dismissed && (
        <div className={styles.floatingBar}>
          <span className={styles.floatingText}>
            Ready to see the real thing?
          </span>
          <button
            className={styles.floatingBtn}
            onClick={handleFloatingCtaClick}
          >
            Book a Discovery Call →
          </button>
          <button
            className={styles.floatingClose}
            onClick={handleDismissBar}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
