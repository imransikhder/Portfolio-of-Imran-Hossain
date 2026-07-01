'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlowingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime();

    // Slow rotation on Y and Z axes
    ringRef.current.rotation.y = t * 0.15;
    ringRef.current.rotation.z = t * 0.08;
    ringRef.current.rotation.x = Math.sin(t * 0.1) * 0.3;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#38BDF8"
        emissive="#38BDF8"
        emissiveIntensity={2}
        wireframe
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
