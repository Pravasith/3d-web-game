import Character from '../Prototypes/Character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import { LOAD_ITEMS } from '../constants/sources'
import { DoubleSide, Mesh, MeshStandardMaterial, ShaderMaterial } from 'three'

import FlamesVertexShader from '../shaders/thrusters/vertex.glsl'
import FlamesFragmentShader from '../shaders/thrusters/fragment.glsl'
import Debug from '../Utils/Debug'

export default class Plini extends Character {
    private debug: Debug
    private debugVars: any
    private flameMaterial: ShaderMaterial

    constructor() {
        const model = Experience.resources.items[LOAD_ITEMS.PLINI_MODEL] as GLTF

        super()

        this.setModel(model)
        this.setControls()

        const material = new MeshStandardMaterial({ color: '#ffffff' })
        this.flameMaterial = new ShaderMaterial({
            vertexShader: FlamesVertexShader,
            fragmentShader: FlamesFragmentShader,
            side: DoubleSide,
            transparent: true,
        })

        model.scene.traverse(o => {
            const mesh = o as Mesh

            if (mesh.isMesh) {
                mesh.material = material
                if (mesh.name === 'shader-test') {
                    mesh.material = this.flameMaterial
                }
            }
        })

        this.debug = new Debug()
        this.debugVars = {}

        this.flameMaterial.uniforms.uTime = { value: null }
    }

    update() {
        super.update()

        // Update Shaders
        this.flameMaterial.uniforms.uTime.value = this.time.elapsed
    }
}
