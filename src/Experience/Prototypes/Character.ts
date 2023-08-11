import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'

const max_velocity_x = 0.05
const max_velocity_z = 0.05 / 4

const max_acceleration_x = 0.01
const step_acceleration_x = 0.0005

const max_acceleration_z = 0.01 / 2
const step_acceleration_z = 0.0005 / 2

export default class Character {
    model: GLTF

    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: Controls
    private time: Time

    private S1 = new THREE.Vector2(0, 0)
    private S2 = new THREE.Vector2()

    private V = new THREE.Vector2()
    private A = new THREE.Vector2()

    private anchor: THREE.Object3D
    private group: THREE.Group

    constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
        this.camera = Experience.camera.instance
        this.anchor = new THREE.Object3D()
        this.group = new THREE.Group()

        this.scene.add(this.anchor)
    }

    setModel(model: GLTF) {
        if (!model) {
            throw new Error('Oops! Forgot to pass the model?')
        } else {
            this.model = model
            this.scene.add(this.model.scene)

            this.model.scene.position.x = this.S1.x
            this.anchor.add(this.camera)
            // this.model.scene.parent = this.anchor
        }
    }

    update() {
        // const { x } = this.model.scene.position

        // if (x < -0.1) {
        //     this.A = new THREE.Vector2(0.0002, 0)
        // } else if (x > 0.1) {
        //     this.A = new THREE.Vector2(-0.0002, 0)
        // } else console.log(x)

        // Update logic
        // this.V = this.V.add(this.A)

        this.V = this.V.add(this.A)

        this.V.x = Math.min(this.V.x, max_velocity_x / 2)
        this.V.x = Math.max(this.V.x, -max_velocity_x)

        this.V.y = Math.min(this.V.y, max_velocity_z)
        this.V.y = Math.max(this.V.y, -max_velocity_z)

        this.S2 = this.S1.add(this.V)

        this.model.scene.position.x = this.S2.x
        this.model.scene.position.z = this.S2.y

        this.anchor.position.x = this.model.scene.position.x

        // this.camera.position.y = this.model.scene.position.y + 4
        // this.camera.position.x = this.model.scene.position.x + 4
    }

    onMouseMove(e: MouseEvent) {
        this.anchor.rotation.y -= e.movementX * 0.001
        this.anchor.rotation.z += e.movementY * 0.001
    }

    setControls() {
        this.controls = new Controls()
        this.controls.setContols((e: MouseEvent) => this.onMouseMove(e))

        // Move forward
        this.controls.on('w_pressed', () => {
            this.A = this.A.add(
                new THREE.Vector2(Math.max(-step_acceleration_x, -max_acceleration_x), 0)
            )
        })

        this.controls.on('w_released', () => {
            this.A.x = 0
            this.A.y = 0
        })

        // Move backward
        this.controls.on('s_pressed', () => {
            this.A = this.A.add(
                new THREE.Vector2(Math.max(step_acceleration_x, max_acceleration_x), 0)
            )
        })

        this.controls.on('s_released', () => {
            this.A.x = 0
            this.A.y = 0
        })

        // // Go left
        // this.controls.on('a_pressed', () => {
        //     this.A = this.A.add(
        //         new THREE.Vector2(0, Math.max(step_acceleration_z, max_acceleration_z))
        //     )
        // })
        //
        // this.controls.on('a_released', () => {
        //     this.A.x = 0
        //     this.A.y = 0
        // })
        //
        // // Go right
        // this.controls.on('d_pressed', () => {
        //     this.A = this.A.add(
        //         new THREE.Vector2(0, Math.max(-step_acceleration_z, -max_acceleration_z))
        //     )
        // })
        //
        // this.controls.on('d_released', () => {
        //     this.A.x = 0
        //     this.A.y = 0
        // })
    }
}
