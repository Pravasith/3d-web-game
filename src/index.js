import "./style.css"
import * as THREE from "three"
import { snowFall } from "./snow"

// Scene
const scene = new THREE.Scene()

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

snowFall()

// Clock
const clock = new THREE.Clock()

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
