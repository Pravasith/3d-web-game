import "./style.css"
import * as THREE from "three"
import { GlobalGUI } from "./utils/gui"

// Scene
const scene = new THREE.Scene()

// GUI
const snowGUI = new GlobalGUI()
snowGUI.addParam("count", 1000)
snowGUI.add(snowGUI.params, "count").min(100).max(10000).step(100)

// Sizes
const sizes = {
    width: 800,
    height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas.webgl"),
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
    // Get elapsed Time
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    mesh.rotation.y = elapsedTime

    // Render again
    renderer.render(scene, camera)

    // Request the next frame and call tick in it
    requestAnimationFrame(tick)
}

tick()
