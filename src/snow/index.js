import * as THREE from "three"
import { GlobalGUI } from "../utils/gui"

// GUI
const snowGUI = new GlobalGUI({
    width: 400,
})

// GUI
const { params } = snowGUI

let geometry = null
let material = null
let points = null

export const snowFall = (scene) => {
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(params.count * 3)

    for (let i = 0; i < params.count; i++) {
        const vertex = i * 3
        
        positions[vertex + 0] = (Math.random() - 0.5) * 50
        positions[vertex + 1] = i * 0.05
        positions[vertex + 2] = (Math.random() - 0.5) * 50
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    material = new THREE.ShaderMaterial({
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: `
            void main()
            {
                /**
                 * Position
                 */
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectionPosition = projectionMatrix * modelPosition;
                gl_Position = projectionPosition;

                /**
                 * Size 
                 */
                gl_PointSize = 2.0;
            }
        `,
        fragmentShader: `
            void main()
            {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        `
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)

    return points
   
}

snowGUI.addParam("count", 8000)
snowGUI.addParam("size", 0.1)
snowGUI.addParam("power", 2)
snowGUI
    .add(params, "count")
    .min(100)
    .max(100000)
    .step(100)
    .onFinishChange(snowFall)
snowGUI
    .add(params, "size")
    .min(0.01)
    .max(0.1)
    .step(0.001)
    .onFinishChange(snowFall)
snowGUI
    .add(params, "power")
    .min(1)
    .max(1500)
    .step(1)
    .onFinishChange(snowFall)
