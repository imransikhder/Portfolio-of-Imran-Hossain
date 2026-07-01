'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Scene3DCanvas = dynamic(() => import('./Scene3DCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Scene3D() {
  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Scene3DCanvas />
      </Suspense>
    </div>
  );
}
