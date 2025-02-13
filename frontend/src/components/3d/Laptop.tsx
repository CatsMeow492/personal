'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

const Laptop = () => {
  const laptopRef = useRef<Group>(null);

  useFrame((state) => {
    if (!laptopRef.current) return;
    
    // Gentle floating animation
    laptopRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    // Slow rotation
    laptopRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={laptopRef}>
      {/* Base */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#2f2f2f" />
      </mesh>

      {/* Screen */}
      <group position={[0, 0.7, -0.7]} rotation={[-0.5, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 1.3, 0.1]} />
          <meshStandardMaterial color="#1f1f1f" />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.9, 1.2]} />
          <meshStandardMaterial emissive="#4338ca" emissiveIntensity={0.2} color="#000000" />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0, 0.2]} rotation={[0.1, 0, 0]} receiveShadow>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

export default Laptop; 