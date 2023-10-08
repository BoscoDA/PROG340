import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
camera.position.set(-10,30,30);
const orbit = new OrbitControls(camera, renderer.domElement);

//Lighting
const ambientLight = new THREE.AmbientLight(0x334455);
scene.add(ambientLight);

//Axis Helpers
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

orbit.update();
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
scene.add(diamondMesh);

//Plane
const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshLambertMaterial({color: 0xF0F0F0, side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;

//Cone
//Cone code taken from my assignment 4 in repo
var cone = new THREE.ConeGeometry(4,5,64);
var coneMaterial = new THREE.MeshLambertMaterial({color:0xFFCFFF, wireframe:true});
var coneMesh = new THREE.Mesh(cone,coneMaterial);
coneMesh.position.set(-10,10,0)
scene.add(coneMesh);

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

function animate(time)
{
    diamondMesh.rotation.x = time / 1000;

    diamondMesh.rotation.y = time / 1000;

    angle += condeGuiOptions.speed;
    coneMesh.position.y = 10*Math.abs(Math.sin(angle));

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);