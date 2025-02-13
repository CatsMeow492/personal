'use client';

import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <div className="text-white text-lg">Loading 3D Scene...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <ClientCanvas />
    </main>
  );
}

function ClientCanvas() {
  return <CanvasWrapper />;
}
