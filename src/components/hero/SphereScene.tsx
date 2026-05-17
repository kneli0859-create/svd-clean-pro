'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Sphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.18;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.45}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color="#FFD700"
          emissive="#FFB300"
          emissiveIntensity={0.18}
          roughness={0.18}
          metalness={0.9}
          distort={0.32}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.06;
  });
  return (
    <mesh ref={ref} scale={2.6} position={[0, 0, -0.4]}>
      <torusGeometry args={[1, 0.005, 16, 240]} />
      <meshBasicMaterial color="#003B73" transparent opacity={0.55} />
    </mesh>
  );
}

function ParticleField() {
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#FFD700"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function SphereScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 6, 6]} intensity={1.4} color="#FFD700" />
      <pointLight position={[-6, -3, 2]} intensity={0.6} color="#003B73" />
      <Sphere />
      <Halo />
      <ParticleField />
      <Sparkles count={120} scale={6} size={2.2} speed={0.6} color="#FFD700" />
      <Environment preset="city" />
    </Canvas>
  );
}
