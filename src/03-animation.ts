import './style.css'
import * as THREE from 'three';

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" })
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
const canvas = document.querySelector("canvas.webgl") as Element;

//Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height)



//Animate 1

// const clock = new THREE.Clock();

const animate = () => {
    // const elapsedTime = clock.getElapsedTime()
    // mesh.position.set(Math.cos(elapsedTime), Math.sin(elapsedTime), 0)
    mesh.rotation.set(
        mesh.rotation.x + 0.01,
        mesh.rotation.y + 0.01,
        0
    )
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)
}

animate()


// //Animate 2

// const cursor = {
//     x: 0,
//     y: 0
// }

// window.addEventListener("mousemove", (event) => {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5
// })

// const animate = () => {
//     // mesh.position.set(cursor.x * 10, cursor.y * 10, 0)
//     mesh.rotation.set(cursor.y * 10, cursor.x * 10, 0)
//     renderer.render(scene, camera);
//     window.requestAnimationFrame(animate)
// }

// animate()