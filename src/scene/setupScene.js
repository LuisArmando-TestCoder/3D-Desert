import * as THREE from 'three';
import preset from 'canvas-preset';
import '../utils/THREE.InfiniteGridHelper';
import {
  setFirstPersonPositionControllers,
  updateFirstPersonPosition,
} from './camera/controller/position/handler';
import setFirstPersonDirectionControllers from './camera/controller/direction/handler';
import handleWindowResize from '../utils/handleWindowResize';
import getRenderer from '../utils/getRenderer';
import getCamera from '../utils/getCamera';
import getScene from '../utils/getScene';
import color from '../utils/color';

function setupScene({
  preRender = console.log,
  onAnimation = () => {},
}) {
  const { draw, c, size } = preset(null, 'canvas', null);

  size();

  const renderer = getRenderer(c);
  const camera = getCamera();
  const scene = getScene();

  renderer.setClearColor(color, 1);

  camera.lookAt(new THREE.Vector3());

  handleWindowResize(camera, renderer);

  c.focus();

  const callbackInfo = {
    c,
    scene,
    camera,
    renderer,
  };

  preRender(callbackInfo);

  setFirstPersonPositionControllers(c);
  setFirstPersonDirectionControllers(camera, c);
  draw(() => {
    updateFirstPersonPosition();
    onAnimation(callbackInfo);
    renderer.render(scene, camera);
  });
}

export default setupScene;
