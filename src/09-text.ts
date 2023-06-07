import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


//Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const matCapTexture = textureLoader.load("../static/textures/matcaps/8.png")


//Text
const fontLoader = new FontLoader();
fontLoader.load(
    "../static/fonts/Roboto Condensed Light_Regular.typeface.json",
    (font) => {
        const textGeometry = new TextGeometry("Hello World", {
            font,
            size: 0.5,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -textGeometry.boundingBox?.max.x * 0.5,
        //     -textGeometry.boundingBox?.max.y * 0.5,
        //     -textGeometry.boundingBox?.max.z * 0.5,
        // )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
        const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial);

            donut.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
            donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
            const scale = Math.random();
            donut.scale.set(scale, scale, scale)

            scene.add(donut)

        }
    }
)

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
