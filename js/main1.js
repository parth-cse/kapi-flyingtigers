// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer, controls;
let isDragging = false;
let mouseX, mouseY;

function init() {
  // Create the scene, camera, and renderer
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.y = 45/180*Math.PI
  camera.position.x = 400;
  camera.position.y = 100;
  camera.position.z = 100;

  const hlight = new THREE.AmbientLight(0x666, 5);
  scene.add(hlight);

  renderer = new THREE.WebGLRenderer({ antialias: true });

  // Get the container3D element
  const container = document.getElementsByClassName("container1")[0];
  if (container) {
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add event listeners for click and drag
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
  } else {
    console.error("container3D element not found!");
  }

  const loader = new GLTFLoader();
  loader.load("./3d/scene.gltf", (gltf) => {
    let build = gltf.scene.children[0];
    build.scale.set(5,5,5);
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  });

  // Add OrbitControls (optional, comment out if not desired)
  controls = new OrbitControls(camera, container);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.minDistance = 10;
  controls.maxDistance = 500;
}

function onMouseDown(event) {
  isDragging = true;
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function onMouseMove(event) {
  if (isDragging) {
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    // Update camera rotation based on drag
    camera.rotation.y += deltaX / window.innerWidth * Math.PI;
    camera.rotation.x += deltaY / window.innerHeight * Math.PI;

    mouseX = event.clientX;
    mouseY = event.clientY;

    renderer.render(scene, camera);
  }
}

function onMouseUp(event) {
  isDragging = false;
}

init();

// Render the scene on every frame
function animate() {
  requestAnimationFrame(animate);
  // Update controls if enabled
  if (controls) controls.update();
  renderer.render(scene, camera);
}

animate();