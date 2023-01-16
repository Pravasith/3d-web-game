import * as THREE from "three"
import { GlobalGUI } from "../utils/gui"

// GUI
const snowGUI = new GlobalGUI({
    width: 400,
})

// GUI
const { params } = snowGUI

export const snowFall = scene => {
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(params.count * 3)

    for (let i = 0; i < params.count; i++) {
        const vertex = i * 3

        positions[vertex + 0] = (Math.random() - 0.5) * 3
        positions[vertex + 1] = (Math.random() - 0.5) * 3
        positions[vertex + 2] = (Math.random() - 0.5) * 3
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
        size: params.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)
}

snowGUI.addParam("count", 10000)
snowGUI.addParam("size", 0.02)
snowGUI.add(params, "count").min(100).max(10000).step(100)
// .onFinishChange(snowFall)
snowGUI.add(params, "size").min(0.01).max(10).step(0.001)
// .onFinishChange(snowFall)
