"use client";

import { SceneReadyProvider } from "@/components/SceneReadyContext";
import LoadingScreen from "@/components/LoadingScreen";

const SCENE_IDS = ["globe", "orbital", "datastream", "blob"];

export default function HomeShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SceneReadyProvider sceneIds={SCENE_IDS} timeout={4000}>
            <LoadingScreen />
            {children}
        </SceneReadyProvider>
    );
}
