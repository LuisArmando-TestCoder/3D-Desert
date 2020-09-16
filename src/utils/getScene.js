import * as THREE from 'three';
import color from './color';

export const near = 10;
export const far = 600;

export default function getScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(color, near, far);
  return scene;
}
