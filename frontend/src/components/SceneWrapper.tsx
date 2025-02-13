'use client';

import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(
  () => import('./3d/CanvasWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 to-gray-800" />
    ),
  }
);

export default function SceneWrapper() {
  return (
    <div className="fixed inset-0 -z-10">
      <CanvasWrapper />
    </div>
  );
} 