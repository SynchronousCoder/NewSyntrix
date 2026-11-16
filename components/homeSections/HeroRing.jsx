"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/* =====================================================
   CONFIGURATION
===================================================== */

const RAW_IMAGES = [
  "https://ik.imagekit.io/m9zi40oov/uiux/Frame%204C.png",
  "https://ik.imagekit.io/m9zi40oov/compress%20img/k72.png?updatedAt=1782026239284",
  "https://ik.imagekit.io/m9zi40oov/uiux/MacBook%20Pro%2016_%20-%201C.png",
  "https://ik.imagekit.io/m9zi40oov/compress%20img/coder.png?updatedAt=1782026239168",
  "https://ik.imagekit.io/m9zi40oov/uiux/Frame%202.png",
  "https://ik.imagekit.io/m9zi40oov/aboutus.png?updatedAt=1782029051521",
];

/* ImageKit resizes on the server: far smaller downloads and GPU uploads.
   If images look soft, raise w-720 to w-1024. */
const IMAGES = RAW_IMAGES.map(
  (url) => `${url}${url.includes("?") ? "&" : "?"}tr=w-720,q-80`,
);

const RING_RADIUS = 6.35;
const CARD_HEIGHT = 4.25;
const CARD_ARC = .95;
const CARD_SEGMENTS = 28;
const ROTATION_SPEED = 0.18;
const RING_TILT_Z = 0.24;
const RING_TILT_X = 0.1;
// const BACK_TINT = "#d9d9d9";
const BACK_TINT = "#cacaca";

/* Split the ring at the text plane (world z = 0) */
const PLANES = {
  front: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
  back: new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
};

/* Shared clock keeps both canvases in sync */
const getAngle = () => (performance.now() / 1000) * ROTATION_SPEED;

useTexture.preload(IMAGES);

/* =====================================================
   RING
===================================================== */

function Ring({ reducedMotion, onReady }) {
  const ringRef = useRef(null);
  const textures = useTexture(IMAGES);
  const gl = useThree((state) => state.gl);

  /* One geometry shared by all cards; each card is only rotated */
  const geometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        RING_RADIUS,
        RING_RADIUS,
        CARD_HEIGHT,
        CARD_SEGMENTS,
        1,
        true,
        -CARD_ARC / 2,
        CARD_ARC,
      ),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    const anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());

    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      texture.needsUpdate = true;
    });

    onReady?.();
  }, [textures, gl, onReady]);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y = reducedMotion ? 0 : getAngle();
    }
  });

  return (
    <group rotation={[RING_TILT_X, 0, RING_TILT_Z]}>
      <group ref={ringRef}>
        {textures.map((texture, index) => (
          <group
            key={IMAGES[index]}
            rotation={[0, (index / textures.length) * Math.PI * 2, 0]}
          >
            {/* Image side */}
            <mesh geometry={geometry}>
              <meshBasicMaterial
                map={texture}
                side={THREE.FrontSide}
                toneMapped={false}
              />
            </mesh>

            {/* Cardboard reverse: plain colour, no image */}
            <mesh geometry={geometry}>
              <meshBasicMaterial
                color={BACK_TINT}
                side={THREE.BackSide}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* =====================================================
   CANVAS LAYER
===================================================== */

export default function HeroRing({ side, frameloop, reducedMotion }) {
  const [ready, setReady] = useState(false);
  const plane = PLANES[side];

  return (
    <div
      className={`hero-canvas hero-canvas--${side}${ready ? " is-ready" : ""}`}
      aria-hidden="true"
    >
      <Canvas
        frameloop={frameloop}
        flat
        camera={{ position: [0, 0, 17], fov: 42, near: 5, far: 40 }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
          stencil: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.clippingPlanes = [plane];
        }}
        fallback={<div className="hero-canvas-fallback" />}
      >
        <Ring reducedMotion={reducedMotion} onReady={() => setReady(true)} />
      </Canvas>
    </div>
  );
}