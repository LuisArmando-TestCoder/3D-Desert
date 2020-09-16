// import * as THREE from 'three';
import setupScene from './setupScene';
import addTerrain from './object/miscellaneous/terrain';
import addSunLight from './object/light/sunlight';

function preRender({ scene, camera }) {
  addTerrain(scene, camera);
  addSunLight(scene);
  // scene.add(new THREE.InfiniteGridHelper(1));
}

export default function renderScene() {
  setupScene({
    preRender,
  });
}
