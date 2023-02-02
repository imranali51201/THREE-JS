import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "red",
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
