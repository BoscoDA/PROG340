import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import topImage from '../img/top.jpg';
import botImage from '../img/bot.jpg';
import side1 from '../img/side1.jpg';
import side2 from '../img/side2.jpg';
import side3 from '../img/side3.jpg';
import side4 from '../img/side4.jpg';

import dice1 from '../img/dice_one.jpg';
import dice2 from '../img/dice_two.jpg';
import dice3 from '../img/dice_three.jpg';
import dice4 from '../img/dice_4.jpg';
import dice5 from '../img/dice_five.jpg';
import dice6 from '../img/dice_six.jpg';
//import background from '../img/background.jpg'; // Credit: <a href="https://www.freepik.com/free-photo/abstract-flowing-neon-wave-background_15474089.htm#query=background&position=26&from_view=keyword">Image by rawpixel.com</a> on Freepik
//import stars from '../img/stars.jpg'; //https://www.pxfuel.com/en/free-photo-obmtg/download

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const monsterURL = new URL('../assets/monster.glb',import.meta.url);

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
//renderer.setClearColor(0x334455);
//const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(topImage);

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

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

camera.position.set(-10, 30, 30);
orbit.update();
//green box
const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);
//new box
const textureLoader = new THREE.TextureLoader();
const box2Geo = new THREE.BoxGeometry(4,4,4);
//const box2Mat = new THREE.MeshBasicMaterial({color: 0x00FF00, map: textureLoader.load(topImage) });
const box2Materials = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(dice1) }),
    new THREE.MeshBasicMaterial({map: textureLoader.load(dice2) }),
    new THREE.MeshBasicMaterial({map: textureLoader.load(dice3) }),
    new THREE.MeshBasicMaterial({map: textureLoader.load(dice4) }),
    new THREE.MeshBasicMaterial({map: textureLoader.load(dice5) }),
    new THREE.MeshStandardMaterial({map: textureLoader.load(dice6) })
]
const box2 = new THREE.Mesh(box2Geo, box2Materials);
box2.position.set(10,5,0);
box2.name = 'boxname';
scene.add(box2);
//Floor
const planeGeo = new THREE.PlaneGeometry(30, 30);
const planeMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;
plane.receiveShadow = true;
//Sphere
const sphereGeo = new THREE.SphereGeometry(4, 40, 40);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0x0000FF, wireframe: false });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const plane2Geo = new THREE.PlaneGeometry(10,10,10,10);
const plane2Mat = new THREE.MeshBasicMaterial({color:0xFFFFFF, wireframe: true});
const plane2 = new THREE.Mesh(plane2Geo,plane2Mat);
scene.add(plane2);
plane2.position.set(10,10,10);

//SHADERS
// const vShader = `
// void main()
//     {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;

// const fShader = `
// void main()
//     {
//         gl_FragColor = vec4(0.3,0.9,1.0,0.9);
//     }
// `;

// SHAER SHPERE GEO
const shaderShpereGeo = new THREE.SphereGeometry(4,40,40);
const shaderSphereMat = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});

const shaderShpere = new THREE.Mesh(shaderShpereGeo,shaderSphereMat);
scene.add(shaderShpere);
shaderShpere.position.set(-5,10,10);

const assetLoader = new GLTFLoader();
assetLoader.load(
    monsterURL.href,
    function(gltf){
        const model = gltf.scene;
        scene.add(model);
        model.position.set(-12,4,10);
    },
    undefined,
    function(error){
        console.error(error);
    }
);

//SOLAR  SYSTEM THIng
const sunGeo = new THREE.SphereGeometry(5,15,15);
const sunMat = new THREE.MeshBasicMaterial({color: 0xFFF200});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
sun.position.y = -10;

const venusGeo = new THREE.SphereGeometry(2,40,40);
const venusMat = new THREE.MeshBasicMaterial({color: 0x5FC747});
const venus = new THREE.Mesh(venusGeo,venusMat);

const venusObject = new THREE.Object3D();
venusObject.add(venus);
scene.add(venusObject);

venus.position.set(sun.position.x + 15, sun.position.y,sun.position.z);

const mercGeo = new THREE.SphereGeometry(2,40,40);
const mercMat = new THREE.MeshBasicMaterial({color: 0xFFB330});
const merc = new THREE.Mesh(mercGeo,mercMat);

const mercObject = new THREE.Object3D();
mercObject.add(merc);
scene.add(mercObject);

merc.position.set(sun.position.x + 10, sun.position.y,sun.position.z);

//Ambient
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
//Spot
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-20,20,0);
spotLight.castShadow = true;
spotLight.decay = 0;
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
//Directional Light
// const dlight = new THREE.DirectionalLight(0xffffff);
// dlight.position.set(-20,20,0);
// dlight.castShadow = true;
// scene.add(dlight);
// dlight.shadow.camera.bottom = -12;

//scene.fog = new THREE.Fog(0xFFFFFF,0,200);
scene.fog = new THREE.FogExp2(0xFFFFFF, .01);

const mousePos = new THREE.Vector2();

window.addEventListener('mouse  move',function(e){
    mousePos.x = (e.clientX / width) * 2 - 1;
    mousePos.y = (e.clientY / height) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

//GUI
const gui = new dat.GUI();
const guiOptions = {
    SphereColor: '#0000FF',
    wireframe: false,
    speed : 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity : 1
};
gui.addColor(guiOptions, 'SphereColor').onChange(function (e) {
    sphere.material.color.set(e);
});

gui.add(guiOptions, 'wireframe').onChange(function (e) {
    sphere.material.wireframe = e;
});

gui.add(guiOptions, 'speed', 0,.1);

gui.add(guiOptions, 'angle', 0, 1);
gui.add(guiOptions, 'penumbra', 0, 1);
gui.add(guiOptions, 'intensity', 0, 1);

var bounceAngle = 0;

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    bounceAngle += guiOptions.speed;
    sphere.position.y =  10*Math.abs(Math.sin(bounceAngle));

    spotLight.angle = guiOptions.angle;
    spotLight.penumbra = guiOptions.penumbra;
    spotLight.intensity = guiOptions.intensity;
    spotLightHelper.update();

    rayCaster.setFromCamera(mousePos, camera);
    const intersectObj = rayCaster.intersectObjects(scene.children);
    //console.log(intersectObj);

    for(var i = 0; i < intersectObj.length; i++)
    {
        if(intersectObj[i].object.id === sphere.id)
        {
            intersectObj[i].object.material.color.set(0xFF0000);
        }

        if(intersectObj[i].object.name === box2.name)
        {
            intersectObj[i].object.rotation.x = time / 1000;
            intersectObj[i].object.rotation.y = time / 1000;
        }
    }

    //Modify the vertex
    plane2.geometry.attributes.position.array[0] = 5 * Math.random();
    plane2.geometry.attributes.position.array[1] = 5 * Math.random();
    plane2.geometry.attributes.position.array[2] = 5 * Math.random();

    //Modify the z position of the last vertex
    const lastZPos = plane2.geometry.attributes.position.array.length-1;
    plane2.geometry.attributes.position.array[lastZPos] = 10 * Math.random();

    //update the array
    plane2.geometry.attributes.position.needsUpdate = true;

    //solar system roation
    sun.rotateY(0.1);
    mercObject.rotateY(0.03);
    merc.rotateY(0.04);

    venusObject.rotateY(0.08);
    venus.rotateY(0.06);
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


