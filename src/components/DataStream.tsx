"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSceneReady } from "@/components/SceneReadyContext";
import styles from "./DataStream.module.css";

function noise3D(x: number, y: number, z: number): number {
    return (
        Math.sin(x * 1.27 + y * 3.43 + z * 0.37) *
        Math.sin(y * 2.17 + z * 1.31 + x * 0.91) *
        Math.cos(z * 1.73 + x * 2.63 + y * 0.47)
    );
}

/**
 * Luminous wave field — a grid of points undulating like a glowing ocean.
 * Points brighten at wave peaks, connection lines link neighbors,
 * and mouse interaction creates ripple distortions.
 * Inspired by Linear/Stripe-style premium wave animations.
 */
export default function DataStream() {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    const { markReady } = useSceneReady();
    const readyRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (
            navigator.hardwareConcurrency != null &&
            navigator.hardwareConcurrency < 2
        ) {
            markReady("datastream");
            return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;
        const isMobile = window.innerWidth < 768;

        /* ── Scene ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            width / height,
            0.1,
            100
        );
        // Angled perspective looking down at the field
        camera.position.set(0, 6, 8);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobile,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(
            isMobile
                ? Math.min(window.devicePixelRatio, 1.5)
                : window.devicePixelRatio
        );
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        /* ── Grid configuration ── */
        const COLS = isMobile ? 28 : 45;
        const ROWS = isMobile ? 28 : 45;
        const SPACING = 0.35;
        const TOTAL = COLS * ROWS;

        // Center the grid
        const offsetX = ((COLS - 1) * SPACING) / 2;
        const offsetZ = ((ROWS - 1) * SPACING) / 2;

        /* ── Points — use instanced mesh for performance ── */
        const dotGeo = new THREE.SphereGeometry(0.03, 6, 6);
        const dotMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            transparent: true,
            opacity: 1,
        });

        // We'll use individual meshes but with a shared geometry
        // for color/opacity control per point
        const points: {
            mesh: THREE.Mesh;
            baseX: number;
            baseZ: number;
            col: number;
            row: number;
        }[] = [];

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const x = col * SPACING - offsetX;
                const z = row * SPACING - offsetZ;

                const mat = new THREE.MeshBasicMaterial({
                    color: 0x4a90d9,
                    transparent: true,
                    opacity: 0.3,
                });
                const mesh = new THREE.Mesh(dotGeo, mat);
                mesh.position.set(x, 0, z);
                group.add(mesh);
                points.push({ mesh, baseX: x, baseZ: z, col, row });
            }
        }

        /* ── Connection lines between neighboring points ── */
        // Horizontal + vertical connections
        const maxConnections = TOTAL * 2; // rough upper bound
        const linePositions = new Float32Array(maxConnections * 6);
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(linePositions, 3)
        );
        lineGeo.setDrawRange(0, 0);

        const lineMat = new THREE.LineBasicMaterial({
            color: 0x4a90d9,
            transparent: true,
            opacity: 0.06,
        });
        group.add(new THREE.LineSegments(lineGeo, lineMat));

        /* ── Color palette for height mapping ── */
        const colorLow = new THREE.Color(0x1a2a4a); // deep dark blue
        const colorMid = new THREE.Color(0x4a90d9); // accent blue
        const colorHigh = new THREE.Color(0x06b6d4); // bright teal

        /* ── Mouse tracking ── */
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                mouseRef.current.tx =
                    ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.ty =
                    -((e.clientY - rect.top) / rect.height) * 2 + 1;
            }
        };
        window.addEventListener("mousemove", onMouseMove);

        /* ── Visibility ── */
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(container);

        /* ── Animation ── */
        let time = 0;

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            if (!readyRef.current) {
                readyRef.current = true;
                markReady("datastream");
            }

            if (!isVisible) return;

            time += 0.003;

            const m = mouseRef.current;
            m.x += (m.tx - m.x) * 0.02;
            m.y += (m.ty - m.y) * 0.02;

            // Slight camera sway from mouse
            camera.position.x = m.x * 1.5;
            camera.position.y = 6 + m.y * 0.5;
            camera.lookAt(0, 0, 0);

            // Mouse world position on the grid plane
            const mouseWorldX = m.x * offsetX * 1.2;
            const mouseWorldZ = -m.y * offsetZ * 0.8;

            // Update each point height
            for (const pt of points) {
                // Layered wave function
                const w1 = Math.sin(pt.baseX * 0.5 + time * 1.2) *
                    Math.cos(pt.baseZ * 0.4 + time * 0.8) * 0.5;
                const w2 = Math.sin(pt.baseX * 0.8 - time * 0.6 + pt.baseZ * 0.3) * 0.3;
                const w3 = noise3D(
                    pt.baseX * 0.25 + time * 0.4,
                    pt.baseZ * 0.25,
                    time * 0.2
                ) * 0.4;

                // Mouse ripple — radial wave emanating from cursor
                const dx = pt.baseX - mouseWorldX;
                const dz = pt.baseZ - mouseWorldZ;
                const distToMouse = Math.sqrt(dx * dx + dz * dz);
                const mouseWave =
                    Math.sin(distToMouse * 1.5 - time * 4) *
                    Math.max(0, 1 - distToMouse * 0.15) *
                    0.4;

                const y = w1 + w2 + w3 + mouseWave;
                pt.mesh.position.y = y;

                // Height-based color and opacity
                const normalizedHeight = (y + 1.2) / 2.4; // roughly -1.2 to 1.2 → 0 to 1
                const t = Math.max(0, Math.min(1, normalizedHeight));

                const mat = pt.mesh.material as THREE.MeshBasicMaterial;

                // Color: dark blue at valleys, accent blue mid, teal at peaks
                if (t < 0.5) {
                    mat.color.copy(colorLow).lerp(colorMid, t * 2);
                } else {
                    mat.color.copy(colorMid).lerp(colorHigh, (t - 0.5) * 2);
                }

                // Opacity: dim in valleys, bright at peaks
                mat.opacity = 0.12 + t * 0.65;

                // Scale: slightly larger at peaks
                const scale = 0.7 + t * 0.6;
                pt.mesh.scale.setScalar(scale);
            }

            // Update connection lines (only between immediate neighbors)
            let lineIdx = 0;
            const posAttr = lineGeo.getAttribute(
                "position"
            ) as THREE.BufferAttribute;

            for (const pt of points) {
                // Right neighbor
                if (pt.col < COLS - 1) {
                    const neighbor = points[pt.row * COLS + pt.col + 1];
                    const base = lineIdx * 6;
                    linePositions[base] = pt.mesh.position.x;
                    linePositions[base + 1] = pt.mesh.position.y;
                    linePositions[base + 2] = pt.mesh.position.z;
                    linePositions[base + 3] = neighbor.mesh.position.x;
                    linePositions[base + 4] = neighbor.mesh.position.y;
                    linePositions[base + 5] = neighbor.mesh.position.z;
                    lineIdx++;
                }
                // Bottom neighbor
                if (pt.row < ROWS - 1) {
                    const neighbor = points[(pt.row + 1) * COLS + pt.col];
                    const base = lineIdx * 6;
                    linePositions[base] = pt.mesh.position.x;
                    linePositions[base + 1] = pt.mesh.position.y;
                    linePositions[base + 2] = pt.mesh.position.z;
                    linePositions[base + 3] = neighbor.mesh.position.x;
                    linePositions[base + 4] = neighbor.mesh.position.y;
                    linePositions[base + 5] = neighbor.mesh.position.z;
                    lineIdx++;
                }
            }

            posAttr.needsUpdate = true;
            lineGeo.setDrawRange(0, lineIdx * 2);

            // Line opacity pulses subtly
            lineMat.opacity = 0.05 + Math.sin(time * 1.5) * 0.015;

            renderer.render(scene, camera);
        };
        animate();

        /* ── Resize ── */
        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        /* ── Cleanup ── */
        return () => {
            cancelAnimationFrame(frameRef.current);
            observer.disconnect();
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            renderer.dispose();
            dotGeo.dispose();
            lineGeo.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [markReady]);

    return <div ref={containerRef} className={styles.container} />;
}
