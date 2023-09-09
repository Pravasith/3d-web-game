import Character from '../Prototypes/Character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import { LOAD_ITEMS } from '../constants/sources'
import * as THREE from 'three'

import FlamesVertexShader from '../shaders/thrusters/vertex.glsl'
import FlamesFragmentShader from '../shaders/thrusters/fragment.glsl'
import Debug from '../Utils/Debug'
import { PI } from '../constants/mathConstants'

export default class Plini extends Character {
    private debug: Debug
    private debugVars: any
    private flameMaterial: THREE.ShaderMaterial

    private flames: THREE.Mesh[]

    constructor() {
        const model = Experience.resources.items[LOAD_ITEMS.PLINI_MODEL] as GLTF

        super()

        this.setModel(model)
        this.setControls()

        const material = new THREE.MeshStandardMaterial({ color: '#ffffff' })
        material.side = THREE.DoubleSide

        this.flameMaterial = new THREE.ShaderMaterial({
            vertexShader: FlamesVertexShader,
            fragmentShader: FlamesFragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
        })

        this.flames = []

        model.scene.traverse(o => {
            const mesh = o as THREE.Mesh

            if (mesh.isMesh) {
                mesh.material = material
                // mesh.material = this.flameMaterial
                if (mesh.name.includes('flame')) {
                    mesh.material = this.flameMaterial
                } else if (mesh.name.includes('thruster-rotor')) {
                    this.flames.push(mesh)
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

    protected onMoveForwardStart(): void {
        this.startFlames()
    }

    protected onMoveBackwardStart(): void {
        this.startFlames()
    }

    protected onMoveRightStart(): void {
        this.startFlames()
    }

    protected onMoveLeftStart(): void {
        this.startFlames()
    }

    protected onMoveForwardEnd(): void {
        this.restFlames()
    }

    protected onMoveBackwardEnd(): void {
        this.restFlames()
    }

    protected onMoveRightEnd(): void {
        this.restFlames()
    }

    protected onMoveLeftEnd(): void {
        this.restFlames()
    }

    private startFlames() {
        if (this.flames.length && this.model) {
            this.flames.forEach(mesh => {
                mesh.rotation.x = THREE.MathUtils.damp(
                    mesh.rotation.x,
                    PI / 3,
                    2,
                    this.time.delta * 0.01
                )
            })

            this.model.scene.rotation.x = THREE.MathUtils.damp(
                this.model.scene.rotation.x,
                PI / 8,
                2,
                this.time.delta * 0.01
            )
        }
    }

    private restFlames() {
        if (this.flames.length && this.model) {
            this.flames.forEach(mesh => {
                mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, 0, 2, this.time.delta)
            })

            this.model.scene.rotation.x = THREE.MathUtils.damp(
                this.model.scene.rotation.x,
                0,
                2,
                this.time.delta * 1
            )
        }
    }
}
