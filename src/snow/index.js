import * as THREE from "three"
import { GlobalGUI } from "../utils/gui"

// GUI
const snowGUI = new GlobalGUI({
    width: 400,
})

export const snowFall = () => {
    const geometry = new THREE.BufferGeometry()

    // GUI
    const { params } = snowGUI
    snowGUI.addParam("count", 1000)
    snowGUI.addParam("size", 0.02)
    snowGUI.add(params, "count").min(100).max(10000).step(100)
    snowGUI.add(params, "size").min(0.01).max(10).step(0.001)

    const positions = new Float32Array(params.count * 3)

    for (let i = 0; i < params.count; i++) {
        const vertex = i * 3

        positions[vertex + 0] = vertex + 0
        positions[vertex + 1] = vertex + 1
        positions[vertex + 2] = vertex + 2
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
}
