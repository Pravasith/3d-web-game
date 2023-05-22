import "./style.css"
import * as THREE from "three"

import INIT from './initialization'

const {
    scene, camera, renderer, clock,
} = INIT


// Models
// gltfLoader.load(
//     '/models/street-art.gltf',
//     (gltf) => {
//         // console.log(gltf)
//         // scene.add(gltf.scene)
//     }
// )

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const material = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            
            gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            vUv = uv;
        }
    `,
    fragmentShader: `
        varying vec2 vUv;

        void main()
        {
            vec2 st = vUv;

            float strength = 
                step(.4, mod(st.x * 10., 1.))
                *
                step(.8, mod(st.y * 10. + .2, 1.))
                +
                step(.4, mod(st.y * 10., 1.))
                *
                step(.8, mod(st.x * 10. + .2, 1.));

            vec3 color = vec3(
                strength, 
                strength, 
                strength
            );

            gl_FragColor = vec4(color, 1.0);
        }
    `
})

const plane = new THREE.Mesh(
    geometry, material
)

scene.add(plane)

let rafID

// Animations
const tick = () => {
    // Get elapsed Time
    const elapsedTime = clock.getElapsedTime()

    renderer.render(scene, camera)
    rafID = requestAnimationFrame(tick)
}

tick()

const stopAnimating = false

stopAnimating && cancelAnimationFrame(rafID)


