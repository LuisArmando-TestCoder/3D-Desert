import * as THREE from 'three';

const loader = new THREE.TextureLoader();

export default function getMaps({
  path,
  names = { map: 'albedo' }, // aoMap, metalMap, roughMap
  dimensions = [1, 1], // (3, 1)
  repeat = 1,
}) {
  const maps = {};
  Object.keys(names).forEach((mapName) => {
    const map = loader.load(`${path}${names[mapName]}`);
    map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
    map.repeat.set(...dimensions).multiplyScalar(repeat);
    maps[mapName] = map;
  });
  return maps;
}
