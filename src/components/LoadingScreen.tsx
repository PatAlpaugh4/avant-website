"use client";

import { useSceneReady } from "@/components/SceneReadyContext";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
    const { allReady } = useSceneReady();

    return (
        <div
            className={`${styles.overlay} ${allReady ? styles.hidden : ""}`}
            aria-hidden={allReady}
        >
            <div className={styles.content}>
                <div className={styles.logo}>avant</div>
                <div className={styles.bar}>
                    <div
                        className={`${styles.barFill} ${allReady ? styles.barDone : ""}`}
                    />
                </div>
            </div>
        </div>
    );
}
