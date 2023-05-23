import "./style.css"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import INIT from './initialization'

const {
    scene, camera, renderer, clock,
} = INIT


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);



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

            vec3 color = vec3(
                st.x, st.y, 0.0 
            );

            gl_FragColor = vec4(color, 1.0);
        }
    `
})

const plane = new THREE.Mesh(
    geometry, material
)

// scene.add(plane)

let model

// Models
gltfLoader.load(
    '/models/troopie.gltf',
    (gltf) => {
        model = gltf
        scene.add(gltf.scene)

        model.scene.traverse(o => {
            if (o.isMesh) {
                o.material = material
            }
        })
    }
)

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


