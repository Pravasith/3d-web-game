import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'
import Helpers from '../Helpers'

const max_velocity_x = 0.08
const max_velocity_z = 0.08 / 4

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
    private helpers: Helpers
    private cameraHelpers: Helpers

    constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
        this.camera = Experience.camera.instance

        this.anchor = new THREE.Object3D()

        this.helpers = new Helpers()
        this.cameraHelpers = new Helpers()

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
        }
    }

    update() {
        if (this.helpers) this.helpers.removeArrowHelper()
        this.helpers.showArrowHelper(
            this.model.scene.position,
            this.model.scene.position,
            2,
            '#ffffff'
        )

        const p = this.camera.position.clone()
        this.camera.getWorldPosition(p)

        if (this.cameraHelpers) this.cameraHelpers.removeArrowHelper()
        this.cameraHelpers.showArrowHelper(
            // p.clone().normalize().sub(this.model.scene.position),
            // new THREE.Vector3(-1, 0, 0),
            p,
            p,
            2,
            '#29abe2'
        )

        this.V = this.V.add(this.A)

        this.V.x = Math.min(this.V.x, max_velocity_x / 2)
        this.V.x = Math.max(this.V.x, -max_velocity_x)

        this.V.y = Math.min(this.V.y, max_velocity_z)
        this.V.y = Math.max(this.V.y, -max_velocity_z)

        this.S2 = this.S1.add(this.V)

        this.model.scene.position.x = this.S2.x
        this.model.scene.position.z = this.S2.y

        this.anchor.position.x = this.model.scene.position.x
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
    }
}
