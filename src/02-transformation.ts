import './style.css'
import * as THREE from 'three';

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" })
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 2
// mesh.position.y = 1
// mesh.position.z = 1
// mesh.position.set(1, -0.5, 1);

// mesh.rotation.x = 2
// mesh.rotation.y = 2
// mesh.rotation.z = 2

// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 2

scene.add(mesh);

//Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

// camera.position.x = 2
// camera.position.y = 1
// camera.position.z = 1
// camera.position.set(1, 1, 1);

// camera.rotation.x = 2
// camera.rotation.y = 2
// camera.rotation.z = 2

// camera.scale.x = 2
// camera.scale.y = 2
// camera.scale.z = 2

scene.add(camera);

//Canvas
const canvas = document.querySelector("canvas.webgl") as Element;

//Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);
