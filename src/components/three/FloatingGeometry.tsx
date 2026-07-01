'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'octahedron' | 'icosahedron' | 'torusKnot';
  rotationSpeed: number;
  floatOffset: number;
  scale?: number;
}

function FloatingShape({
  position,
  geometry,
  rotationSpeed,
  floatOffset,
  scale = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Rotation at unique speeds
    meshRef.current.rotation.x = t * rotationSpeed * 0.5;
    meshRef.current.rotation.y = t * rotationSpeed;
    meshRef.current.rotation.z = t * rotationSpeed * 0.3;

    // Subtle floating motion using Math.sin
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + floatOffset) * 0.3;
    meshRef.current.position.x =
      position[0] + Math.sin(t * 0.3 + floatOffset * 2) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'octahedron' && <octahedronGeometry args={[0.5, 0]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[0.4, 0]} />}
      {geometry === 'torusKnot' && (
        <torusKnotGeometry args={[0.3, 0.08, 64, 8]} />
      )}
      <meshStandardMaterial
        color="#38BDF8"
        wireframe
        transparent
        opacity={0.3}
        emissive="#38BDF8"
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function FloatingGeometry() {
  return (
    <group>
      <FloatingShape
        position={[-3.5, 2, -3]}
        geometry="octahedron"
        rotationSpeed={0.2}
        floatOffset={0}
        scale={0.8}
      />
      <FloatingShape
        position={[4, -1.5, -4]}
        geometry="icosahedron"
        rotationSpeed={0.15}
        floatOffset={2}
        scale={0.7}
      />
      <FloatingShape
        position={[3, 2.5, -2]}
        geometry="torusKnot"
        rotationSpeed={0.12}
        floatOffset={4}
        scale={0.6}
      />
    </group>
  );
}
