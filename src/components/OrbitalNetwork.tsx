"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSceneReady } from "@/components/SceneReadyContext";
import styles from "./OrbitalNetwork.module.css";

function noise3D(x: number, y: number, z: number): number {
    return (
        Math.sin(x * 1.27 + y * 3.43 + z * 0.37) *
        Math.sin(y * 2.17 + z * 1.31 + x * 0.91) *
        Math.cos(z * 1.73 + x * 2.63 + y * 0.47)
    );
}

/**
 * Morphing torus knot — organic flowing geometry with wireframe overlay,
 * glow shell, and drifting particles. Same layered approach as MorphBlob
 * but with a more complex, premium topology.
 */
export default function OrbitalNetwork() {
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
            markReady("orbital");
            return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;
        const isMobile = window.innerWidth < 768;

        /* ── Scene ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            40,
            width / height,
            0.1,
            100
        );
        camera.position.set(-1.5, 0, 9.6);

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

        const tubularSegments = isMobile ? 80 : 128;
        const radialSegments = isMobile ? 12 : 24;

        /* ── Solid inner torus knot ── */
        const solidGeo = new THREE.TorusKnotGeometry(
            1.6, 0.5, tubularSegments, radialSegments, 2, 3
        );
        const solidOriginal = new Float32Array(
            solidGeo.attributes.position.array
        );
        const solidMat = new THREE.MeshBasicMaterial({
            color: 0x141420,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
        });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        group.add(solidMesh);

        /* ── Wireframe overlay ── */
        const wireGeo = new THREE.TorusKnotGeometry(
            1.6, 0.5, tubularSegments, radialSegments, 2, 3
        );
        const wireOriginal = new Float32Array(
            wireGeo.attributes.position.array
        );
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
            depthWrite: false,
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        group.add(wireMesh);

        /* ── Outer glow shell ── */
        const glowGeo = new THREE.TorusKnotGeometry(
            1.6, 0.75, Math.floor(tubularSegments * 0.6), Math.floor(radialSegments * 0.6), 2, 3
        );
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            transparent: true,
            opacity: 0.025,
            side: THREE.BackSide,
            depthWrite: false,
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        group.add(glowMesh);

        /* ── Luminous edge highlights — second wireframe with different color ── */
        const edgeGeo = new THREE.TorusKnotGeometry(
            1.6, 0.52, tubularSegments, radialSegments, 2, 3
        );
        const edgeOriginal = new Float32Array(
            edgeGeo.attributes.position.array
        );
        const edgeMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.05,
            depthWrite: false,
        });
        const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
        group.add(edgeMesh);

        /* ── Drifting particles — scattered in a volume around the knot ── */
        const PARTICLE_COUNT = isMobile ? 30 : 60;
        const particleGeo = new THREE.SphereGeometry(1, 6, 6);
        const particles: {
            mesh: THREE.Mesh;
            basePos: THREE.Vector3;
            phase: number;
            speed: number;
        }[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Distribute on a sphere surface with radius jitter
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.2 + Math.random() * 1.5;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const isAccent = Math.random() > 0.6;
            const mat = new THREE.MeshBasicMaterial({
                color: isAccent ? 0x06b6d4 : 0x4a90d9,
                transparent: true,
                opacity: 0.15 + Math.random() * 0.35,
            });
            const mesh = new THREE.Mesh(particleGeo, mat);
            const size = 0.01 + Math.random() * 0.02;
            mesh.scale.setScalar(size);
            mesh.position.set(x, y, z);
            group.add(mesh);

            particles.push({
                mesh,
                basePos: new THREE.Vector3(x, y, z),
                phase: Math.random() * Math.PI * 2,
                speed: 0.3 + Math.random() * 0.5,
            });
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
        // Period for the noise cycle — keeps inputs bounded so the
        // surface never degrades over time. Uses a prime-ish period
        // so the loop point is imperceptible.
        const CYCLE = Math.PI * 20; // ~62.8s at 0.002/frame@60fps

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            if (!readyRef.current) {
                readyRef.current = true;
                markReady("orbital");
            }

            if (!isVisible) return;

            time = (time + 0.002) % CYCLE;

            const m = mouseRef.current;
            m.x += (m.tx - m.x) * 0.015;
            m.y += (m.ty - m.y) * 0.015;

            // Use sin/cos of time so noise inputs stay smooth & bounded
            const tSin = Math.sin(time);
            const tCos = Math.cos(time);
            const tSin2 = Math.sin(time * 0.6);
            const tCos2 = Math.cos(time * 0.4);

            // Morph vertices — organic noise displacement along normals
            const solidPos = solidGeo.attributes.position
                .array as Float32Array;
            const wirePos = wireGeo.attributes.position
                .array as Float32Array;
            const edgePos = edgeGeo.attributes.position
                .array as Float32Array;

            for (let i = 0; i < solidPos.length; i += 3) {
                const ox = solidOriginal[i];
                const oy = solidOriginal[i + 1];
                const oz = solidOriginal[i + 2];

                const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
                if (len < 0.001) continue;
                const nx = ox / len;
                const ny = oy / len;
                const nz = oz / len;

                // Two octaves of noise — inputs stay bounded via sin/cos of time
                const n1 = noise3D(
                    ox * 0.6 + tSin * 2,
                    oy * 0.6 + tCos * 1.5,
                    oz * 0.6 + tSin2
                );
                const n2 = noise3D(
                    ox * 1.2 + tCos2 * 1.5,
                    oy * 1.2 + tSin * 0.8,
                    oz * 1.2 + tCos * 0.6
                );
                const displacement = len * (1 + n1 * 0.08 + n2 * 0.04);

                solidPos[i] = nx * displacement;
                solidPos[i + 1] = ny * displacement;
                solidPos[i + 2] = nz * displacement;

                // Wire slightly larger — reuse same noise values
                const wox = wireOriginal[i];
                const woy = wireOriginal[i + 1];
                const woz = wireOriginal[i + 2];
                const wlen = Math.sqrt(wox * wox + woy * woy + woz * woz);
                if (wlen < 0.001) continue;
                const wnx = wox / wlen;
                const wny = woy / wlen;
                const wnz = woz / wlen;
                const wdisp = wlen * (1 + n1 * 0.08 + n2 * 0.04) * 1.003;

                wirePos[i] = wnx * wdisp;
                wirePos[i + 1] = wny * wdisp;
                wirePos[i + 2] = wnz * wdisp;

                // Edge layer slightly offset
                if (i < edgePos.length) {
                    const eox = edgeOriginal[i];
                    const eoy = edgeOriginal[i + 1];
                    const eoz = edgeOriginal[i + 2];
                    const elen = Math.sqrt(
                        eox * eox + eoy * eoy + eoz * eoz
                    );
                    if (elen > 0.001) {
                        const enx = eox / elen;
                        const eny = eoy / elen;
                        const enz = eoz / elen;
                        const edisp =
                            elen * (1 + n1 * 0.08 + n2 * 0.04) * 1.006;
                        edgePos[i] = enx * edisp;
                        edgePos[i + 1] = eny * edisp;
                        edgePos[i + 2] = enz * edisp;
                    }
                }
            }

            solidGeo.attributes.position.needsUpdate = true;
            wireGeo.attributes.position.needsUpdate = true;
            edgeGeo.attributes.position.needsUpdate = true;
            solidGeo.computeVertexNormals();

            // Smooth rotation + mouse influence
            const rotY = time * 0.2 + m.x * 0.25;
            const rotX = Math.sin(time * 0.3) * 0.12 + m.y * 0.15;
            const rotZ = time * 0.05;

            solidMesh.rotation.set(rotX, rotY, rotZ);
            wireMesh.rotation.set(rotX, rotY, rotZ);
            edgeMesh.rotation.set(rotX, rotY, rotZ);
            glowMesh.rotation.set(rotX * 0.5, time * 0.1, rotZ * 0.5);

            // Glow pulse
            glowMat.opacity = 0.025 + Math.sin(time * 1.5) * 0.012;

            // Wire opacity shimmer
            wireMat.opacity = 0.12 + Math.sin(time * 2.5) * 0.03;
            edgeMat.opacity = 0.05 + Math.sin(time * 1.8 + 1) * 0.02;

            // Animate particles — gentle drift
            for (const p of particles) {
                const drift = noise3D(
                    p.basePos.x * 0.3 + time * p.speed,
                    p.basePos.y * 0.3,
                    p.basePos.z * 0.3 + time * 0.2
                );
                p.mesh.position.x =
                    p.basePos.x + Math.sin(time * p.speed + p.phase) * 0.2;
                p.mesh.position.y =
                    p.basePos.y + Math.cos(time * p.speed * 0.7 + p.phase) * 0.2;
                p.mesh.position.z =
                    p.basePos.z + drift * 0.15;

                // Subtle pulse
                const baseScale = p.mesh.userData.baseScale || p.mesh.scale.x;
                if (!p.mesh.userData.baseScale) p.mesh.userData.baseScale = baseScale;
                p.mesh.scale.setScalar(
                    baseScale * (0.8 + Math.sin(time * 2 + p.phase) * 0.2)
                );
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
            edgeGeo.dispose();
            particleGeo.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [markReady]);

    return <div ref={containerRef} className={styles.container} />;
}
