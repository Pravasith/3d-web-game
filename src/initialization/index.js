
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.5,
    800
)
camera.position.z = 1
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

// Clock
const clock = new THREE.Clock()

const INIT = { scene, camera, renderer, clock }

export default INIT
