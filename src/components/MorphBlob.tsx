"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSceneReady } from "@/components/SceneReadyContext";
import styles from "./MorphBlob.module.css";

function noise3D(x: number, y: number, z: number): number {
    const n =
        Math.sin(x * 1.27 + y * 3.43 + z * 0.37) *
        Math.sin(y * 2.17 + z * 1.31 + x * 0.91) *
        Math.cos(z * 1.73 + x * 2.63 + y * 0.47);
    return n;
}

export default function MorphBlob() {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    const { markReady } = useSceneReady();
    const readyRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency < 2) {
            markReady("blob");
            return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;
        const isMobile = window.innerWidth < 768;

        /* ── Scene ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 7.5);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
        renderer.setSize(width, height);
        renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const detail = isMobile ? 3 : 4;

        /* ── Solid inner mesh ── */
        const solidGeo = new THREE.IcosahedronGeometry(2, detail);
        const solidOriginal = new Float32Array(solidGeo.attributes.position.array);
        const solidMat = new THREE.MeshBasicMaterial({
            color: 0x1a1a2e,
            transparent: true,
            opacity: 0.5,
        });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        scene.add(solidMesh);

        /* ── Wireframe overlay ── */
        const wireGeo = new THREE.IcosahedronGeometry(2, detail);
        const wireOriginal = new Float32Array(wireGeo.attributes.position.array);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            wireframe: true,
            transparent: true,
            opacity: 0.2,
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        scene.add(wireMesh);

        /* ── Outer glow ── */
        const glowGeo = new THREE.IcosahedronGeometry(2.4, 3);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            transparent: true,
            opacity: 0.04,
            side: THREE.BackSide,
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glowMesh);

        /* ── Orbiting particles ── */
        const ORBITER_COUNT = isMobile ? 5 : 8;
        const orbiterGeo = new THREE.SphereGeometry(0.035, 8, 8);
        const orbiters: THREE.Mesh[] = [];

        for (let i = 0; i < ORBITER_COUNT; i++) {
            const mat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x4a90d9 : 0x06b6d4,
                transparent: true,
                opacity: 0.5 + Math.random() * 0.3,
            });
            const mesh = new THREE.Mesh(orbiterGeo, mat);
            scene.add(mesh);
            orbiters.push(mesh);
        }

        /* ── Mouse tracking ── */
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                mouseRef.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1;
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
                markReady("blob");
            }

            if (!isVisible) return;

            time += 0.003;

            // Smooth mouse
            const m = mouseRef.current;
            m.x += (m.tx - m.x) * 0.02;
            m.y += (m.ty - m.y) * 0.02;

            // Morph vertices
            const solidPos = solidGeo.attributes.position.array as Float32Array;
            const wirePos = wireGeo.attributes.position.array as Float32Array;

            for (let i = 0; i < solidPos.length; i += 3) {
                const ox = solidOriginal[i];
                const oy = solidOriginal[i + 1];
                const oz = solidOriginal[i + 2];

                const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
                const nx = ox / len;
                const ny = oy / len;
                const nz = oz / len;

                const n1 = noise3D(ox * 0.8 + time, oy * 0.8, oz * 0.8 + time * 0.5);
                const n2 = noise3D(ox * 1.5 + time * 0.3, oy * 1.5, oz * 1.5);
                const displacement = len * (1 + n1 * 0.12 + n2 * 0.06);

                solidPos[i] = nx * displacement;
                solidPos[i + 1] = ny * displacement;
                solidPos[i + 2] = nz * displacement;

                wirePos[i] = nx * displacement * 1.005;
                wirePos[i + 1] = ny * displacement * 1.005;
                wirePos[i + 2] = nz * displacement * 1.005;
            }

            solidGeo.attributes.position.needsUpdate = true;
            wireGeo.attributes.position.needsUpdate = true;
            solidGeo.computeVertexNormals();

            // Rotation + mouse influence
            const rotY = time * 0.25 + m.x * 0.3;
            const rotX = Math.sin(time * 0.4) * 0.15 + m.y * 0.2;

            solidMesh.rotation.set(rotX, rotY, 0);
            wireMesh.rotation.set(rotX, rotY, 0);
            glowMesh.rotation.set(rotX * 0.5, time * 0.15, 0);

            // Glow pulse
            glowMat.opacity = 0.04 + Math.sin(time * 2) * 0.02;

            // Orbiting particles
            for (let i = 0; i < ORBITER_COUNT; i++) {
                const phase = (i / ORBITER_COUNT) * Math.PI * 2;
                const speed = 0.4 + (i % 3) * 0.1;
                const radius = 2.6 + Math.sin(time * 0.8 + i * 1.3) * 0.4;
                const tiltAngle = (i % 2 === 0 ? 1 : -1) * 0.4 + i * 0.2;

                const angle = time * speed + phase;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = Math.sin(angle + tiltAngle) * radius * 0.4;

                orbiters[i].position.set(x, y, z);

                // Pulse scale
                const scale = 0.8 + Math.sin(time * 3 + i) * 0.3;
                orbiters[i].scale.setScalar(scale);
            }

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
            solidGeo.dispose();
            wireGeo.dispose();
            glowGeo.dispose();
            orbiterGeo.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [markReady]);

    return <div ref={containerRef} className={styles.container} />;
}
