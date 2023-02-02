import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';

const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "red",
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Debug ui
gui.add(mesh.position, "x", -3, 3, 0.01)
gui.add(mesh.position, "y", -3, 3, 0.01)
gui.add(mesh.position, "z", -3, 3, 0.01)
gui.add(mesh, "visible")
gui.add(material, "wireframe")
gui.addColor(material, "color")

const functions = {
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
    }
}

gui.add(functions, "spin")



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
