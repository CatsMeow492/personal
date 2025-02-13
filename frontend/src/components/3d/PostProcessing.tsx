'use client';

import dynamic from 'next/dynamic';
import { Vector2 } from 'three';
import { BlendFunction } from 'postprocessing';

const EffectComposer = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.EffectComposer),
  { ssr: false }
);

const Bloom = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Bloom),
  { ssr: false }
);

const ChromaticAberration = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.ChromaticAberration),
  { ssr: false }
);

const Vignette = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Vignette),
  { ssr: false }
);

function PostProcessingContent() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
      />
      <ChromaticAberration
        offset={new Vector2(0.002, 0.002)}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette
        darkness={0.4}
        offset={0.5}
      />
    </EffectComposer>
  );
}

export default dynamic(() => Promise.resolve(PostProcessingContent), {
  ssr: false
}); 