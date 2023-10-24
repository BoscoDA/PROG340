import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import side1 from '../img/side1.jpg';
import side2 from '../img/side2.jpg';
import side3 from '../img/side3.jpg';
import side4 from '../img/side4.jpg';
//Planet Textures from: https://www.solarsystemscope.com/textures/
import earthSurface from '../img/2k_earth_daymap.jpg';
import jupiterSurface from '../img/2k_jupiter.jpg';
import marsSurface from '../img/2k_mars.jpg';
import mercurySurface from '../img/2k_mercury.jpg';
import moonSurface from '../img/2k_moon.jpg';
import neptuneSurface from '../img/2k_neptune.jpg';
import saturnRingSurface from '../img/2k_saturn_ring_alpha.png';
import saturnSurface from '../img/2k_saturn.jpg';
import uranusSurface from '../img/2k_uranus.jpg';
import venusSurface from '../img/2k_venus_surface.jpg';
import sunSurface from '../img/2k_sun.jpg';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10, 0, 25);
orbit.update();

//Backround Texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
    side1,
    side2,
    side1,
    side3,
    side3,
    side4,
])
scene.background = cubeTexture;

const ambientLight = new THREE.AmbientLight(0x112233);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF,100,400,1);
scene.add(pointLight);
pointLight.castShadow = true;

//SOLAR  SYSTEM THIng
const tLoader = new THREE.TextureLoader();

//sun
const sunGeo = new THREE.SphereGeometry(12,40,40);
const sunTexture = tLoader.load(sunSurface);
const sunMat = new THREE.MeshBasicMaterial({
    map: sunTexture,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//mercury
const mercGeo = new THREE.SphereGeometry(2,40,40);
const mercTexture = tLoader.load(mercurySurface);
const mercMat = new THREE.MeshStandardMaterial({map: mercTexture});
const merc = new THREE.Mesh(mercGeo,mercMat);
merc.receiveShadow = true;
//tilt 0.1 degree
merc.rotation.z = 0.00174533;

const mercObject = new THREE.Object3D();
mercObject.add(merc);
scene.add(mercObject);

merc.position.set(sun.position.x + 20, sun.position.y,sun.position.z);

//venus
const venusGeo = new THREE.SphereGeometry(4,40,40);
const venusTexture = tLoader.load(venusSurface);
const venusMat = new THREE.MeshStandardMaterial({map: venusTexture});
const venus = new THREE.Mesh(venusGeo,venusMat);
venus.receiveShadow = true;
//tilt 177 degree
venus.rotation.z = 3.08923;
const venusObject = new THREE.Object3D();
venusObject.add(venus);
scene.add(venusObject);

venus.position.set(sun.position.x + 35, sun.position.y,sun.position.z);

//earth
const surface = tLoader.load(earthSurface);
const earthGeo = new THREE.SphereGeometry(5,40,40);
const earthMat = new THREE.MeshStandardMaterial({map: surface});
const earth = new THREE.Mesh(earthGeo,earthMat);
earth.receiveShadow = true;
//tilt 23 degree = .4 rad
earth.rotation.z = .4;

const earthObject = new THREE.Object3D();
earthObject.add(earth);
scene.add(earthObject);

earth.position.set(sun.position.x + 50, sun.position.y,sun.position.z);

//moon
const moonTexture = tLoader.load(moonSurface);
const moonGeo = new THREE.SphereGeometry(2,40,40);
const moonMat = new THREE.MeshStandardMaterial({map: moonTexture});
const moon = new THREE.Mesh(moonGeo,moonMat);
moon.receiveShadow = true;


//mars
const marsGeo = new THREE.SphereGeometry(3,40,40);
const marsTexture = tLoader.load(marsSurface);
const marsMat = new THREE.MeshStandardMaterial({map: marsTexture});
const mars = new THREE.Mesh(marsGeo,marsMat);
mars.receiveShadow = true;
//tilt 25 degree
mars.rotation.z = 0.436332;
const marsObject = new THREE.Object3D();
marsObject.add(mars);
scene.add(marsObject);

mars.position.set(sun.position.x + 65, sun.position.y,sun.position.z);

//jupiter
const jupiterGeo = new THREE.SphereGeometry(9,40,40);
const jupiterTexture = tLoader.load(jupiterSurface);
const jupiterMat = new THREE.MeshStandardMaterial({map: jupiterTexture});
const jupiter = new THREE.Mesh(jupiterGeo,jupiterMat);
jupiter.receiveShadow = true;
//tilt 3 degree
jupiter.rotation.z = 0.0523599;
const jupiterObject = new THREE.Object3D();
jupiterObject.add(jupiter);
scene.add(jupiterObject);

jupiter.position.set(sun.position.x + 80, sun.position.y,sun.position.z);

//saturn
const saturnGeo = new THREE.SphereGeometry(8,40,40);
const satrunTexture = tLoader.load(saturnSurface);
const saturnMat = new THREE.MeshStandardMaterial({map: satrunTexture});
const saturn = new THREE.Mesh(saturnGeo,saturnMat);
saturn.receiveShadow = true;
//tilt 27 degree
saturn.rotation.z = 0.471239;
// const ringTexture = tLoader.load(saturnRingSurface);
// const ring1Geo = new THREE.RingGeometry(10,11,30,30);
// const ring1Mat = new THREE.MeshBasicMaterial({map: ringTexture});
// const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)

// const ring2Geo = new THREE.RingGeometry(12,13,30,30);
// const ring2Mat = new THREE.MeshBasicMaterial({map: ringTexture});
// const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)

// const ring3Geo = new THREE.RingGeometry(14,15,30,30);
// const ring3Mat = new THREE.MeshBasicMaterial({map: ringTexture});
// const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)

// saturn.add(ring1);
// saturn.add(ring2);
// saturn.add(ring3);

const saturnObject = new THREE.Object3D();
saturnObject.add(saturn);
scene.add(saturnObject);

saturn.position.set(sun.position.x + 108, sun.position.y,sun.position.z);

//uranus
const uranusGeo = new THREE.SphereGeometry(7,40,40);
const uranusTexture = tLoader.load(uranusSurface);
const uranusMat = new THREE.MeshStandardMaterial({map: uranusTexture});
const uranus = new THREE.Mesh(uranusGeo,uranusMat);
uranus.receiveShadow = true;
//tilt 98 degree
uranus.rotation.z = 1.71042;
const uranusObject = new THREE.Object3D();
uranusObject.add(uranus);
scene.add(uranusObject);

uranus.position.set(sun.position.x +  132, sun.position.y,sun.position.z);

//neptune
const neptuneGeo = new THREE.SphereGeometry(6,40,40);
const neptuneTexture = tLoader.load(neptuneSurface);
const neptuneMat = new THREE.MeshStandardMaterial({map: neptuneTexture});
const neptune = new THREE.Mesh(neptuneGeo,neptuneMat);
neptune.receiveShadow = true;
//tilt 30degree
neptune.rotation.z = 0.523599;
const neptuneObject = new THREE.Object3D();
neptuneObject.add(neptune);
scene.add(neptuneObject);

neptune.position.set(sun.position.x + 150, sun.position.y,sun.position.z);

//pluto
const plutoGeo = new THREE.SphereGeometry(2,40,40);
const plutoMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const pluto = new THREE.Mesh(plutoGeo,plutoMat);
pluto.receiveShadow = true;
pluto.rotation.z = 2.1380283;
const plutoObject = new THREE.Object3D();
plutoObject.add(pluto);
scene.add(plutoObject);

pluto.position.set(sun.position.x + 165, sun.position.y,sun.position.z);


function animate(time) {
    //solar system roation
    sun.rotateY(0.005);
    
    mercObject.rotateY(0.0078954)
    merc.rotation.y += 0.04;

    venusObject.rotateY(0.008345);
    venus.rotation.y -= 0.04;

    earthObject.rotateY(0.007654);
    earth.rotation.y += 0.005;

    marsObject.rotateY(0.006345);
    mars.rotation.y += 0.04;

    jupiterObject.rotateY(0.0059876);
    jupiter.rotation.y += 0.04;

    saturnObject.rotateY(0.004645);
    saturn.rotation.y += 0.04;

    uranusObject.rotateY(0.003234);
    uranus.rotation.x += 0.04;

    neptuneObject.rotateY(0.00256);
    neptune.rotation.y += 0.04;

    plutoObject.rotateY(0.001);
    pluto.rotation.y -= 0.04;


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