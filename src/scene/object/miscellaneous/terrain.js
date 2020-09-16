import * as THREE from 'three';
import getMaps from '../../../utils/getMaps';

const vertexShaderGlobalScope = /* glsl */ `
float waveRandom(float n) {
  return sin(n * 2.0) + sin(n * 3.14159265359);
}

float getZHeight(float ease, float scale) {
  float xCoord = waveRandom((position.x + scale) / ease);
  float yCoord = waveRandom(position.y / ease);
  float height = (xCoord + yCoord) * scale;
  float zheight = position.z + height;
  return zheight;
}
`;

const vertexShaderMainScope = /* glsl */ `
    #include <fog_vertex>
    float scale = 5.0;
    float bigWave = getZHeight(75.0 * scale, 5.0 * scale);
    float mediumWave = getZHeight(-50.0 * scale, 2.5 * scale);
    float littleWave = getZHeight(20.0 * scale, -1.25 * scale);
    float wave = bigWave + mediumWave + littleWave;
    float zheight = max(0.0, wave);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, zheight, 1.0);
`;

function setShaderBeforeCompile(
  shader,
) {
  shader.vertexShader = vertexShaderGlobalScope // eslint-disable-line
    + shader.vertexShader.replace(
      '#include <fog_vertex>',
      vertexShaderMainScope,
    );

  this.material.userData.shader = shader;
}

export default function addTerrain(scene) {
  const size = 5000;
  const geometry = new THREE.PlaneBufferGeometry(size, size, 500, 500);
  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    ...getMaps({
      // lights: true,
      path: '/assets/textures/Sand_007_SD/Sand_007_',
      names: {
        map: 'basecolor.jpg',
        normalMap: 'normal.jpg',
        roughMap: 'roughness.jpg',
        // metalnessMap: 'Metallic',
        aoMap: 'ambientOcclusion.jpg',
        displacementMap: 'height.png',
      },
      repeat: 1000,
    }),
  });
  material.onBeforeCompile = setShaderBeforeCompile.bind({ material });
  const carpet = new THREE.Mesh(geometry, material);
  carpet.rotation.x = -Math.PI / 2;
  carpet.position.y = 0;
  scene.add(carpet);
  return carpet;
}
