import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { SphereGeometry } from "three";
import * as dat from 'dat.gui';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-20,20,0);
spotLight.castShadow = true;
spotLight.decay = 0;

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

camera.position.set(-10,30,30);
orbit.update();

const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);

const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;

const sphereGeo = new SphereGeometry(4, 40, 40);
const sphereMat = new THREE.MeshStandardMaterial({color:0x0000FF, wireframe:true});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.castShadow = true;
scene.add(sphere);
sphere.position.set(-10,10,0);

const gui = new dat.GUI();
var angle = 0;
const guiOptions = {
    SphereColor: '#0000FF',
    wireframe: true,
    speed: .02,
    angle: .02
};

gui.addColor(guiOptions, 'SphereColor').onChange(function(e){sphere.material.color.set(e);});
gui.add(guiOptions, 'wireframe').onChange(function(e){sphere.material.wireframe = e;});

//gui.add(guiOptions, 'angle', 0, 1)
gui.add(guiOptions, 'speed', 0, 1);

const spotlightGui = new dat.GUI();
const spotlightGuiOptions = {
    angle: 0.5,
    penumbra: 0.5,
    intensity: 1
}

spotlightGui.add(spotlightGuiOptions, 'angle', 0, 1);
spotlightGui.add(spotlightGuiOptions, 'penumbra', 0, 1);
spotlightGui.add(spotlightGuiOptions, 'intensity', 0, 1);

function animate(time)
{
    box.rotation.x = time / 1000;
    box.rotation.y = time /1000;

    angle += guiOptions.speed;
    sphere.position.y = 10*Math.abs(Math.sin(angle));

    spotLight.angle = spotlightGuiOptions.angle;
    spotLight.penumbra = spotlightGuiOptions.penumbra;
    spotLight.intensity = spotlightGuiOptions.intensity;
    spotLightHelper.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
