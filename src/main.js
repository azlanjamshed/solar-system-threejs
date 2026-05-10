import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import space from "./assets/star.jpg";
import sunIm from "./assets/sun.jpg";
import mercuryIm from "./assets/mercury.jpg";
import venusIm from "./assets/venus.jpg";
import earthIm from "./assets/earth.jpg";
import marsIm from "./assets/mars.jpg";
import jupiterIm from "./assets/jupiter.jpg";
import saturnIm from "./assets/saturn.jpg";
import saturnRingIm from "./assets/saturnRing.png";
import uranusIm from "./assets/uranus.jpg";
import neptuneIm from "./assets/neptune.jpg";
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTExtureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTExtureLoader.load([
  space,
  space,
  space,
  space,
  space,
  space,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 64, 64);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunIm),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//create planet
function createPlanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  scene.add(obj);

  mesh.position.x = position;
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      50,
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  return { mesh, obj };
}
//mercury

const mercury = createPlanet(3.2, mercuryIm, 28);
const venus = createPlanet(5.8, venusIm, 44);
const earth = createPlanet(6, earthIm, 62);
const mars = createPlanet(4, marsIm, 78);
const Jupiter = createPlanet(12, jupiterIm, 100);
//saturn
const saturn = createPlanet(7, saturnIm, 138, {
  innerRadius: 10,
  outerRadius: 15,
  texture: saturnRingIm,
});

const uranus = createPlanet(7, uranusIm, 176);
const neptune = createPlanet(7, neptuneIm, 200);

const pointLight = new THREE.PointLight("gold", 3000, 1000);
scene.add(pointLight);
function animate() {
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  Jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);

  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  Jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
