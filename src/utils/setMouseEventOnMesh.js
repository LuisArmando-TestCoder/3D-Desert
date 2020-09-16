import * as THREE from 'three';

function getMouseVector(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  return mouse;
}

export default function setMouseEventOnMesh({
  eventName = 'click',
  mesh, // required
  callback = console.log,
  camera, // required
  canvas,
}) {
  const mouseZone = canvas || window;
  const raycaster = new THREE.Raycaster();
  mouseZone.addEventListener(eventName, (event) => {
    const mouse = getMouseVector(event);

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(mesh, true);
    const isObjectIntersecting = intersects.length > 0;

    if (isObjectIntersecting) {
      const [firstIntersected] = intersects;

      firstIntersected.object.traverse((object3D) => {
        const canExecuteCallback = object3D.isMesh && callback;

        if (canExecuteCallback) callback(object3D);
      });
    }
  });
}
