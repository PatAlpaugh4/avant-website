"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface SceneReadyContextValue {
    /** Call this when a Three.js scene has rendered its first frame. */
    markReady: (id: string) => void;
    /** True once every registered scene is ready (or timeout elapsed). */
    allReady: boolean;
}

const SceneReadyContext = createContext<SceneReadyContextValue>({
    markReady: () => {},
    allReady: false,
});

export function useSceneReady() {
    return useContext(SceneReadyContext);
}

/**
 * Provider that tracks readiness of all Three.js scenes on the page.
 * Pass `sceneIds` for the scenes you expect to load.
 * Falls back to ready after `timeout` ms regardless.
 */
export function SceneReadyProvider({
    sceneIds,
    timeout = 4000,
    children,
}: {
    sceneIds: string[];
    timeout?: number;
    children: React.ReactNode;
}) {
    const [readySet, setReadySet] = useState<Set<string>>(new Set());
    const [timedOut, setTimedOut] = useState(false);

    const markReady = useCallback((id: string) => {
        setReadySet((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setTimedOut(true), timeout);
        return () => clearTimeout(timer);
    }, [timeout]);

    const allReady =
        timedOut || sceneIds.every((id) => readySet.has(id));

    const value = useMemo(
        () => ({ markReady, allReady }),
        [markReady, allReady]
    );

    return (
        <SceneReadyContext.Provider value={value}>
            {children}
        </SceneReadyContext.Provider>
    );
}
