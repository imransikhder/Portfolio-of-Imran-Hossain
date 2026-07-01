'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ParticleField from './ParticleField';
import GlowingRing from './GlowingRing';
import FloatingGeometry from './FloatingGeometry';
import HeroOrb from './HeroOrb';

export default function Scene3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#38BDF8"
      />
      <pointLight
        position={[-5, -3, 3]}
        intensity={0.4}
        color="#38BDF8"
      />
      <pointLight
        position={[0, 3, -2]}
        intensity={0.3}
        color="#1E40AF"
      />

      {/* Background stars */}
      <Stars
        radius={50}
        depth={80}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* 3D Elements */}
      <ParticleField />
      <GlowingRing />
      <FloatingGeometry />
      <HeroOrb />
    </Canvas>
  );
}
