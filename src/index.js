import "./style.css"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import World from "./world/world";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const canvas = document.getElementsByClassName('webgl')[0]

const world = World.init(canvas)

// const material = new THREE.ShaderMaterial({
//     vertexShader: `
//         varying vec2 vUv;
//
//         void main()
//         {
//            
//             gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         varying vec2 vUv;
//
//         void main()
//         {
//             vec2 st = vUv;
//
//             vec3 color = vec3(
//                 st.x, st.y, 0.0 
//             );
//
//             gl_FragColor = vec4(color, 1.0);
//         }
//     `
// })


// let model
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.8

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
world.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#29abef', 2)
world.add(directionalLight)

// Models
gltfLoader.load(
    '/models/troopie.gltf',
    (gltf) => {
        world.add(gltf.scene)

        gltf.scene.traverse(o => {
            if (o.isMesh) {
                o.material = material
            }
        })
    }
)

World.startRaf()
