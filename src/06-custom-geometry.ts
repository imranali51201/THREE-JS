import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Scene
const scene = new THREE.Scene();

// Custom Geometry Object
// for custom geometry we will have to describe the points positions that where we want to add the point on the axis?
// to store points we use float arrays, we will define partitions or segments in float array, the length of partition or segment depends on our need
// each segment will be called a vertex
// to draw a triangle we can use this 3 x 3 float array
// [
// X1, Y1, Z1
// X2, Y2, Z2,
// X3, Y3, Z3
// ]

// // For 1 triangle
// const pointsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ]);

// For multiple triangle
const triangleCount = 50;
const pointsArray = new Float32Array(triangleCount * 3 * 3);
pointsArray.forEach((_, index) => pointsArray[index] = (Math.random() - 0.5) * 4)


const positionAttributes = new THREE.BufferAttribute(pointsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionAttributes);

const material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

//Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLElement;

//Orbital Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

//Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height)

//Resize
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("dblclick", () => {
    if (!window.document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        window.document.exitFullscreen()
    }
})

// Animation

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)
}

animate()
