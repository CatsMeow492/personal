'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

// Dynamically import Scene to ensure it only loads on the client
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
});

export default function CanvasWrapper() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{
          position: [0, 3, 8],
          fov: 45
        }}
        style={{ width: '100vw', height: '100vh' }}
        dpr={[1, 2]} // Optimize for different pixel ratios
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
} 