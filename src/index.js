import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GlobalGUI } from "./utils/gui"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// import { snowFall } from "./snow"

const gltfLoader = new GLTFLoader()


// Scene
export const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: 800,
    height: 600,
}

// Models
gltfLoader.load(
    '/models/street-art.gltf',
    (gltf) => {
        console.log(gltf)
        scene.add(gltf.scene)
    }
)

// GUI
const lightsGUI = new GlobalGUI({
    width: 400,
})

const { params } = lightsGUI

lightsGUI.addParam("intensity", 7)
lightsGUI.addParam("x", 1)
lightsGUI.addParam("y", 1)
lightsGUI.addParam("z", 1)
lightsGUI
    .add(params, "intensity")
    .name("Light Intensity")
    .min(0)
    .max(10)
    .step(0.001)
    .onFinishChange(() => {
        directionalLight.intensity = params.intensity
    })
lightsGUI
    .add(params, "x")
    .name("Light X")
    .min(-5)
    .max(5)
    .step(0.01)
    .onFinishChange(() => {
        directionalLight.position.x = params.x
    })
lightsGUI
    .add(params, "y")
    .name("Light Y")
    .min(-5)
    .max(5)
    .step(0.01)
    .onFinishChange(() => {
        directionalLight.position.y = params.y
    })
lightsGUI
    .add(params, "z")
    .name("Light Z")
    .min(-5)
    .max(5)
    .step(0.01)
    .onFinishChange(() => {
        directionalLight.position.z = params.z
    })

// Lights
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
const directionalLight = new THREE.DirectionalLight("#ffffff", params.intensity)
directionalLight.position.set(0.25, 3, -2.25)
scene.add(directionalLight, ambientLight)


// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.5,
    800
)
camera.position.z = 8
scene.add(camera)

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Controls
const controls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.physicallyCorrectLights = true

// snowFall()
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
scene.add(sphere)

// Clock
export const clock = new THREE.Clock()

// Animations
const tick = () => {
    // Get elapsed Time
    const elapsedTime = clock.getElapsedTime()

    // Render again
    renderer.render(scene, camera)

    // Request the next frame and call tick in it
    requestAnimationFrame(tick)
}

tick()
