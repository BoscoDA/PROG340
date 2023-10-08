import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import topImage from '../img/top.jpg';
import botImage from '../img/bot.jpg';
import side1 from '../img/side1.jpg';
import side2 from '../img/side2.jpg';
import side3 from '../img/side3.jpg';
import side4 from '../img/side4.jpg';
//image open sources from: 
//https://pixabay.com/photos/milky-way-stars-night-sky-2695569/
//https://pixabay.com/photos/milky-way-nebula-galaxy-stars-74005/
//https://pixabay.com/illustrations/universe-hole-space-fog-galaxy-4027609/

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
camera.position.set(-10,30,30);
const orbit = new OrbitControls(camera, renderer.domElement);

//Lighting
const ambientLight = new THREE.AmbientLight(0x334455);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20,20,0);
spotLight.decay = 0;
spotLight.castShadow = true;
scene.add(spotLight);

//Axis Helpers
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

orbit.update();

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

//Geo

//Diamond
//Code taken from my assignment 4 in repo
const vertices = [
    0, 1, 0, // 0: top

    //make a hexagon for 6 faced diamond
    1,0,0,                                                         // point a
    (Math.cos(Math.PI/3)),0,(Math.sin(Math.PI/3)),                 // point b 
    (Math.cos(2 * (Math.PI/3))),0,(Math.sin(2 * (Math.PI/3))),     // point c
    -1,0,0,                                                        // point d     
    (Math.cos(4 * (Math.PI/3))),0,(Math.sin(4 * (Math.PI/3))),     // point e 
    (Math.cos(5 * (Math.PI/3))),0,(Math.sin(5 * (Math.PI/3))),     // point f 

    0, -1, 0 // 7: bottom
]
const faces = [
    1,2,0,
    2,3,0,
    3,4,0,
    4,5,0,
    5,6,0,
    6,1,0,
    1,7,2,
    2,7,3,
    3,7,4,
    4,7,5,
    5,7,6,
    6,7,1,
]
const diamondGeometry = new THREE.PolyhedronGeometry(vertices, faces, 1, 0)
var diamondMaterial = new THREE.MeshLambertMaterial({color:0xa6e329});
var diamondMesh = new THREE.Mesh(diamondGeometry,diamondMaterial);
diamondMesh.position.set(0,5,0);
diamondMesh.scale.set(2, 4, 2);
diamondMesh.castShadow = true;
scene.add(diamondMesh);

//Plane
const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshLambertMaterial({color: 0xF0F0F0, side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;

//Cone
//Cone code taken from my assignment 4 in repo
var cone = new THREE.ConeGeometry(4,5,64);
var coneMaterial = new THREE.MeshLambertMaterial({color:0xFFCFFF, wireframe:true});
var coneMesh = new THREE.Mesh(cone,coneMaterial);
coneMesh.position.set(-10,10,0);
coneMesh.castShadow = true;
scene.add(coneMesh);

//GUI
const coneGui = new dat.GUI();
var angle = 0;
const condeGuiOptions = {
    ConeColor: coneMesh.material.color.getHex(),
    wireframe: true,
    speed: .02,
    angle: .02
};

coneGui.addColor(condeGuiOptions, 'ConeColor').onChange(function(e){coneMesh.material.color.set(e);});
coneGui.add(condeGuiOptions, 'wireframe').onChange(function(e){coneMesh.material.wireframe = e;});
coneGui.add(condeGuiOptions, 'speed', 0, 1);

const diamondGui = new dat.GUI();
const diamondGuiOptions = {
    DiamondColor: diamondMesh.material.color.getHex(),
    wireframe: true,
    xSpeed: 10,
    ySpeed: 10,
    zSpeed: 10,
    scale: 4
};

diamondGui.addColor(diamondGuiOptions, 'DiamondColor').onChange(function(e){diamondMesh.material.color.set(e);});
diamondGui.add(diamondGuiOptions, 'scale', 0, 10).onChange(function(e){diamondMesh.scale.set(e/2, e, e/2);});
diamondGui.add(diamondGuiOptions, 'xSpeed', 0, 10);
diamondGui.add(diamondGuiOptions, 'ySpeed', 0, 10);
diamondGui.add(diamondGuiOptions, 'zSpeed', 0, 10);

const spotlightGui = new dat.GUI();
const spotlightGuiOptions = {
    angle: 0.5,
    penumbra: 0.5,
    intensity: 1
}

spotlightGui.add(spotlightGuiOptions, 'angle', 0, 1);
spotlightGui.add(spotlightGuiOptions, 'penumbra', 0, 1);
spotlightGui.add(spotlightGuiOptions, 'intensity', 0, 10);

function animate(time)
{
    if(diamondGuiOptions.xSpeed > 0)
    {
        diamondMesh.rotation.x = time / (diamondGuiOptions.xSpeed * 100);
    }
    else
    {
        diamondMesh.rotation.x = 0;
    }

    if(diamondGuiOptions.ySpeed > 0)
    {
        diamondMesh.rotation.y = time /(diamondGuiOptions.ySpeed * 100);
    }
    else
    {
        diamondMesh.rotation.y = 0;
    }

    if(diamondGuiOptions.zSpeed > 0)
    {
        diamondMesh.rotation.z = time /(diamondGuiOptions.zSpeed * 100);
    }
    else
    {
        diamondMesh.rotation.z = 0;
    }

    angle += condeGuiOptions.speed;
    coneMesh.position.y = 10*Math.abs(Math.sin(angle));

    spotLight.angle = spotlightGuiOptions.angle;
    spotLight.penumbra = spotlightGuiOptions.penumbra;
    spotLight.intensity = spotlightGuiOptions.intensity;
    spotLightHelper.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);