'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    // Fresnel-based glow: brighter at edges
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    
    // Pulsing intensity
    float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
    
    // Gradient blue colors
    vec3 innerColor = vec3(0.22, 0.74, 0.97);  // #38BDF8
    vec3 outerColor = vec3(0.06, 0.29, 0.55);  // deeper blue
    vec3 color = mix(innerColor, outerColor, fresnel);
    
    // Final color with pulsing glow
    float alpha = fresnel * pulse * uIntensity * 0.6;
    
    gl_FragColor = vec4(color * pulse * 1.5, alpha);
  }
`;

export default function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    uniforms.uTime.value = t;

    // Subtle pulsing scale
    const scale = 1 + Math.sin(t * 1.2) * 0.05;
    meshRef.current.scale.setScalar(scale);

    // Very slow rotation
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.z = t * 0.03;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
