import * as THREE from 'three';

export default function addSunLight(scene) {
  const light = new THREE.PointLight(0xaaaaaa, 25, 5400, 1);
  light.position.set(0, 5000, 0);
  scene.add(new THREE.PointLightHelper(light));
  scene.add(light);
}
