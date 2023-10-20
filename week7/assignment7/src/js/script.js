import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10, 30, 30);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//SOLAR  SYSTEM THIng
const sunGeo = new THREE.SphereGeometry(5,15,15);
const sunMat = new THREE.MeshBasicMaterial({color: 0xFFF200});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const mercGeo = new THREE.SphereGeometry(2,40,40);
const mercMat = new THREE.MeshBasicMaterial({color: 0xFFB330});
const merc = new THREE.Mesh(mercGeo,mercMat);

const mercObject = new THREE.Object3D();
mercObject.add(merc);
scene.add(mercObject);

merc.position.set(sun.position.x + 10, sun.position.y,sun.position.z);

const venusGeo = new THREE.SphereGeometry(2,40,40);
const venusMat = new THREE.MeshBasicMaterial({color: 0x5FC747});
const venus = new THREE.Mesh(venusGeo,venusMat);

const venusObject = new THREE.Object3D();
venusObject.add(venus);
scene.add(venusObject);

venus.position.set(sun.position.x + 15, sun.position.y,sun.position.z);

const earthGeo = new THREE.SphereGeometry(2,40,40);
const earthMat = new THREE.MeshBasicMaterial({color: 0x0000FF});
const earth = new THREE.Mesh(earthGeo,earthMat);

const earthObject = new THREE.Object3D();
earthObject.add(earth);
scene.add(earthObject);

earth.position.set(sun.position.x + 20, sun.position.y,sun.position.z);

const marsGeo = new THREE.SphereGeometry(2,40,40);
const marsMat = new THREE.MeshBasicMaterial({color: 0xFF0000});
const mars = new THREE.Mesh(marsGeo,marsMat);

const marsObject = new THREE.Object3D();
marsObject.add(mars);
scene.add(marsObject);

mars.position.set(sun.position.x + 25, sun.position.y,sun.position.z);

const jupiterGeo = new THREE.SphereGeometry(2,40,40);
const jupiterMat = new THREE.MeshBasicMaterial({color: 0x04FF00});
const jupiter = new THREE.Mesh(jupiterGeo,jupiterMat);

const jupiterObject = new THREE.Object3D();
jupiterObject.add(jupiter);
scene.add(jupiterObject);

jupiter.position.set(sun.position.x + 30, sun.position.y,sun.position.z);

const saturnGeo = new THREE.SphereGeometry(2,40,40);
const saturnMat = new THREE.MeshBasicMaterial({color: 0xF400F0});
const saturn = new THREE.Mesh(saturnGeo,saturnMat);

const saturnObject = new THREE.Object3D();
saturnObject.add(saturn);
scene.add(saturnObject);

saturn.position.set(sun.position.x + 35, sun.position.y,sun.position.z);

const uranusGeo = new THREE.SphereGeometry(2,40,40);
const uranusMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const uranus = new THREE.Mesh(uranusGeo,uranusMat);

const uranusObject = new THREE.Object3D();
uranusObject.add(uranus);
scene.add(uranusObject);

uranus.position.set(sun.position.x + 40, sun.position.y,sun.position.z);

const neptuneGeo = new THREE.SphereGeometry(2,40,40);
const neptuneMat = new THREE.MeshBasicMaterial({color: 0x0000FF});
const neptune = new THREE.Mesh(neptuneGeo,neptuneMat);

const neptuneObject = new THREE.Object3D();
neptuneObject.add(neptune);
scene.add(neptuneObject);

neptune.position.set(sun.position.x + 45, sun.position.y,sun.position.z);

function animate(time) {
    //solar system roation
    sun.rotateY(0.1);

    mercObject.rotateY(0.03);
    merc.rotateY(0.04);

    venusObject.rotateY(0.05);
    venus.rotateY(0.06);

    earthObject.rotateY(0.04);
    earth.rotateY(0.04);

    marsObject.rotateY(0.045);
    mars.rotateY(0.03);

    jupiterObject.rotateY(0.042);
    jupiter.rotateY(0.034);

    saturnObject.rotateY(0.05);
    saturn.rotateY(0.04);

    uranusObject.rotateY(0.052);
    uranus.rotateY(0.043);

    neptuneObject.rotateY(0.055);
    neptune.rotateY(0.03);

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", function(){
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    render.render(scene,camera);
})