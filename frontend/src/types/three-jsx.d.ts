import { Object3D } from 'three';
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: JSX.IntrinsicElements['div'] & {
        ref?: React.RefObject<Object3D>;
        position?: [number, number, number];
        rotation?: [number, number, number];
      };
      mesh: JSX.IntrinsicElements['div'] & {
        ref?: React.RefObject<Object3D>;
        position?: [number, number, number];
        rotation?: [number, number, number];
        castShadow?: boolean;
        receiveShadow?: boolean;
      };
      boxGeometry: JSX.IntrinsicElements['div'] & {
        args?: [number, number, number];
        attach?: string;
      };
      planeGeometry: JSX.IntrinsicElements['div'] & {
        args?: [number, number];
        attach?: string;
      };
      meshStandardMaterial: JSX.IntrinsicElements['div'] & {
        color?: string;
        emissive?: string;
        emissiveIntensity?: number;
        attach?: string;
      };
      ambientLight: JSX.IntrinsicElements['div'] & {
        intensity?: number;
      };
      directionalLight: JSX.IntrinsicElements['div'] & {
        position?: [number, number, number];
        intensity?: number;
        castShadow?: boolean;
        'shadow-mapSize-width'?: number;
        'shadow-mapSize-height'?: number;
      };
      pointLight: JSX.IntrinsicElements['div'] & {
        position?: [number, number, number];
        intensity?: number;
      };
      color: JSX.IntrinsicElements['div'] & {
        attach?: string;
        args?: [string];
      };
      primitive: JSX.IntrinsicElements['div'] & {
        object?: Object3D;
      };
    }
  }
} 