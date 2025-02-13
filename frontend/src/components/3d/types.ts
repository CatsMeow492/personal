import { Object3DNode, ExtendedColors, Overwrite } from '@react-three/fiber';
import type {
  AmbientLight,
  DirectionalLight,
  PointLight,
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
  BufferGeometry,
  Material,
  Object3DEventMap,
} from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>;
    directionalLight: Object3DNode<DirectionalLight, typeof DirectionalLight>;
    pointLight: Object3DNode<PointLight, typeof PointLight>;
    mesh: Object3DNode<Mesh<BufferGeometry, Material | Material[]>, typeof Mesh>;
    planeGeometry: ExtendedColors<Overwrite<Partial<PlaneGeometry>, Object3DNode<PlaneGeometry, typeof PlaneGeometry>>>;
    meshStandardMaterial: ExtendedColors<
      Overwrite<
        Partial<MeshStandardMaterial>,
        Object3DNode<MeshStandardMaterial, typeof MeshStandardMaterial>
      >
    > & {
      metalness?: number;
      roughness?: number;
      emissive?: string;
      emissiveIntensity?: number;
      color?: string;
      transparent?: boolean;
      opacity?: number;
      attach?: string;
    };
  }
} 