"use client";

import { SceneReadyProvider } from "@/components/SceneReadyContext";
import LoadingScreen from "@/components/LoadingScreen";

// Only the scenes that actually mount on the homepage — a stray id here
// forces the loading screen to always wait out the full timeout
const SCENE_IDS = ["globe", "datastream"];

export default function HomeShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SceneReadyProvider sceneIds={SCENE_IDS} timeout={1200}>
            <LoadingScreen />
            {children}
        </SceneReadyProvider>
    );
}
