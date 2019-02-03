var THREE = require('three');
var DNA = require('./dna.js');
var OrbitControls = require('three-orbit-controls')(THREE);
OrbitControls === undefined;

var mainScene = new THREE.Scene();
var frustumDenom = 5;
var mainCamera = new THREE.OrthographicCamera(
    window.innerWidth / -frustumDenom, window.innerWidth / frustumDenom, 
    window.innerHeight / frustumDenom, window.innerHeight / -frustumDenom, 
    0.01, 1000);
var orbitControls = new OrbitControls(mainCamera);
orbitControls.minPolarAngle = Math.PI / 2;
orbitControls.maxPolarAngle = Math.PI / 2;
orbitControls.enableZoom = false;
orbitControls.enablePan = false;

mainCamera.position.z = 50;
orbitControls.update();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var strand = new DNA.Strand(.5);
mainScene.add(strand.mesh);

animate();

function animate(){
    requestAnimationFrame(animate);
    orbitControls.update();
    renderer.render(mainScene, mainCamera);
}