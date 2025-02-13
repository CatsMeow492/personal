'use client';

import { OrbitControls, Stars, Text, useGLTF, Float } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

function WaveParticles() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 100 - 50;
      const z = Math.random() * 100 - 50;
      const y = Math.random() * 20 - 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geometry = points.current?.geometry;
    if (geometry) {
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        positions[i * 3 + 1] = Math.sin(time + x * 0.1) * 2 + Math.cos(time + z * 0.1) * 2;
      }
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          normalized={false}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Starfield() {
  const starsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={50}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

interface BuildingProps {
  position: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
  text: string;
  url?: string;
  color?: string;
}

function Building({ position, width = 4, height = 8, depth = 4, text, url, color = '#ff0066' }: BuildingProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const router = useRouter();

  const handleClick = () => {
    if (!url) return;
    
    if (url.startsWith('http')) {
      // For external links, use window.open only on the client side
      const win = window?.open(url, '_blank');
      if (win) {
        win.opener = null;
      }
    } else {
      // For internal routes, use Next.js router
      router.push(url);
    }
  };

  return (
    <group position={position}>
      {/* Building */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={hovered ? '#ff88aa' : color}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          attach="material"
        />
      </mesh>

      {/* Holographic Text */}
      <Float
        speed={5}
        rotationIntensity={0.2}
        floatIntensity={0.2}
        position={[0, height / 2 + 1, depth / 2 + 0.5]}
      >
        <Text
          color={hovered ? '#ffffff' : color}
          fontSize={0.8}
          maxWidth={width}
          textAlign="center"
          anchorY="bottom"
        >
          {text}
        </Text>
      </Float>

      {/* Windows */}
      {Array.from({ length: 4 }).map((_, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <mesh
            key={`window-${i}-${j}`}
            position={[
              -width / 2 + 1 + j * (width - 2) / 2,
              -height / 2 + 1 + i * (height - 2) / 3,
              depth / 2 + 0.1
            ]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshStandardMaterial
              color={hovered ? '#ffff00' : '#88ccff'}
              emissive={hovered ? '#ffff00' : '#88ccff'}
              emissiveIntensity={hovered ? 1 : 0.5}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function Street() {
  return (
    <group>
      {/* Main Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Buildings */}
      <Building
        position={[-6, 4, -5]}
        text="Taylor Mohney"
        color="#ff0066"
      />
      <Building
        position={[6, 4, -5]}
        text="GitHub"
        url="https://github.com/taylormohney"
        color="#00ff88"
      />
      <Building
        position={[-6, 4, 5]}
        text="LinkedIn"
        url="https://linkedin.com/in/taylormohney"
        color="#0088ff"
      />
      <Building
        position={[6, 4, 5]}
        text="Projects"
        url="/projects"
        color="#ff8800"
      />
    </group>
  );
}

function Scene() {
  const { scene } = useThree();
  
  useEffect(() => {
    if (scene) {
      scene.background = new THREE.Color('#000000');
      scene.fog = new THREE.FogExp2('#000000', 0.05);
    }
  }, [scene]);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ff00ff" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#ffff00" />

      {/* Scene Content */}
      <Street />
      <WaveParticles />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

export default Scene; 