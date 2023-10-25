import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

//star model from: https://sketchfab.com/3d-models/gold-star-15adb339f45f4620a111c43e33388ba4
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const starURL = new URL('../assets/gold_star.glb',import.meta.url);

//image open sources from: 
//https://pixabay.com/photos/milky-way-stars-night-sky-2695569/
//https://pixabay.com/photos/milky-way-nebula-galaxy-stars-74005/
//https://pixabay.com/illustrations/universe-hole-space-fog-galaxy-4027609/
import topImage from '../img/top.jpg';
import botImage from '../img/bot.jpg';
import side1 from '../img/side1.jpg';
import side2 from '../img/side2.jpg';
import side3 from '../img/side3.jpg';
import side4 from '../img/side4.jpg';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-98.923, 108.24, 63);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x112233);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF,100,400,1);
scene.add(pointLight);
pointLight.castShadow = true;

//Backround Texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
    side1,
    side2,
    topImage,
    botImage,
    side3,
    side4,
])
scene.background = cubeTexture;

//SOLAR  SYSTEM THIng
const tLoader = new THREE.TextureLoader();

//sun
const sunGeo = new THREE.SphereGeometry(12,40,40);
const sunTexture = tLoader.load(sunSurface);
const sunMat = new THREE.MeshBasicMaterial({
    map: sunTexture,
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

venus.position.set(sun.position.x + 40, sun.position.y,sun.position.z);

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

earth.position.set(sun.position.x + 60, sun.position.y,sun.position.z);

//moon
const moonTexture = tLoader.load(moonSurface);
const moonGeo = new THREE.SphereGeometry(2,40,40);
const moonMat = new THREE.MeshStandardMaterial({map: moonTexture});
const moon = new THREE.Mesh(moonGeo,moonMat);
moon.receiveShadow = true;

const moonObject = new THREE.Object3D();
moonObject.add(moon);
earth.add(moonObject);

const moonLight = new THREE.PointLight(0xFFFFFF,50,10,2);
moonLight.castShadow = true;
moon.add(moonLight);

moon.position.set(10,sun.position.y, sun.position.z);

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

mars.position.set(sun.position.x + 80, sun.position.y,sun.position.z);

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

jupiter.position.set(sun.position.x + 105, sun.position.y,sun.position.z);

//saturn
const saturnGeo = new THREE.SphereGeometry(8,40,40);
const satrunTexture = tLoader.load(saturnSurface);
const saturnMat = new THREE.MeshStandardMaterial({map: satrunTexture});
const saturn = new THREE.Mesh(saturnGeo,saturnMat);
saturn.receiveShadow = true;
//tilt 27 degree
saturn.rotation.z = 0.471239;

//Learned TorusGeo from: https://threejs.org/docs/#api/en/geometries/TorusGeometry
const ringTexture = tLoader.load(saturnRingSurface);
const ring1Geo = new THREE.TorusGeometry(10,1,2,200,6.2);
const ring1Mat = new THREE.MeshBasicMaterial({map: ringTexture});
const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);

const ring2Geo = new THREE.TorusGeometry(13,1,2,200,6.2);
const ring2Mat = new THREE.MeshBasicMaterial({map: ringTexture});
const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)

const ring3Geo = new THREE.TorusGeometry(16,1,2,200,6.2);
const ring3Mat = new THREE.MeshBasicMaterial({map: ringTexture});
const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)

const saturnObject = new THREE.Object3D();
saturnObject.add(saturn);
scene.add(saturnObject);
saturnObject.add(ring1);
saturnObject.add(ring2);
saturnObject.add(ring3);

ring1.rotation.x = Math.PI/2;
ring2.rotation.x = Math.PI/2;
ring3.rotation.x = Math.PI/2;

saturn.position.set(sun.position.x + 138, sun.position.y,sun.position.z);
ring1.position.set(sun.position.x + 138, sun.position.y,sun.position.z);
ring2.position.set(sun.position.x + 138, sun.position.y,sun.position.z);
ring3.position.set(sun.position.x + 138, sun.position.y,sun.position.z);

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

uranus.position.set(sun.position.x +  170, sun.position.y,sun.position.z);

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

neptune.position.set(sun.position.x + 190, sun.position.y,sun.position.z);

//pluto
const plutoGeo = new THREE.SphereGeometry(2,40,40);
const plutoMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const pluto = new THREE.Mesh(plutoGeo,plutoMat);
pluto.receiveShadow = true;
pluto.rotation.z = 2.1380283;
const plutoObject = new THREE.Object3D();
plutoObject.add(pluto);
scene.add(plutoObject);

pluto.position.set(sun.position.x + 210, sun.position.y,sun.position.z);

// star model
const assetLoader = new GLTFLoader();
assetLoader.load(
    starURL.href,
    function(gltf){
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0,20,0);
        model.scale.set(10,10,10)
    },
    undefined,
    function(error){
        console.error(error);
    }
);

var alternate = 0;

function animate(time) {
    //solar system roation
    sun.rotateY(0.005);
    
    mercObject.rotateY(0.008)
    merc.rotation.y += 0.004;

    venusObject.rotateY(0.005);
    venus.rotation.y -= 0.007;

    earthObject.rotateY(0.002);
    earth.rotation.y += 0.005;

    moonObject.rotateY(0.00125)
    moon.rotateY(0.006);

    marsObject.rotateY(0.0009);
    mars.rotation.y += 0.004;

    jupiterObject.rotateY(0.00065);
    jupiter.rotation.y += 0.002;

    saturnObject.rotateY(0.0004);
    saturn.rotation.y += 0.008;

    uranusObject.rotateY(0.00025);
    uranus.rotation.x += 0.005;

    neptuneObject.rotateY(0.0001);
    neptune.rotation.y += 0.009;

    plutoObject.rotateY(0.00007);
    pluto.rotation.y -= 0.003;

    for (let i = 101; i <= 4968; i += 12) {
        if(alternate == 0)
        {
            if(sun.geometry.attributes.position.array[i] < 0){
                sun.geometry.attributes.position.array[i] += -0.75;
            }
            else{
                sun.geometry.attributes.position.array[i] += 0.75;
            }

            if(sun.geometry.attributes.position.array[i+2] < 0){
                sun.geometry.attributes.position.array[i+2] += -0.75;
            }
            else{
                sun.geometry.attributes.position.array[i+2] += 0.75;
            }
        }
        else
        {
            if(sun.geometry.attributes.position.array[i] < 0){
                sun.geometry.attributes.position.array[i] += 0.75;
            }
            else{
                sun.geometry.attributes.position.array[i] += -0.75;
            }

            if(sun.geometry.attributes.position.array[i+2] < 0){
                sun.geometry.attributes.position.array[i+2] += 0.75;
            }
            else{
                sun.geometry.attributes.position.array[i+2] += -0.75;
            }
        }
    }
        
    if(alternate == 0){
        alternate++;
    }
    else{
        alternate--;
    }

    

    sun.geometry.attributes.position.needsUpdate = true;
    console.log(camera.position);
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", function(){
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
})