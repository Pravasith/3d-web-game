import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'
import Helpers from '../Helpers'
import Tween from '../Tween'

// const max_velocity_x = 0.08
// const max_velocity_z = 0.08 / 4
//
// const max_acceleration_x = 0.01
// const step_acceleration_x = 0.0005
//
// const max_acceleration_z = 0.01 / 2
// const step_acceleration_z = 0.0005 / 2

export default class Character {
    model: GLTF

    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: Controls
    private time: Time
    private tween: Tween

    private max_velocity_z = 0.08
    private max_velocity_x = 0.08

    private acceleration_z = 0.00025
    private acceleration_x = 0.00025

    private S1: THREE.Vector3
    private S2: THREE.Vector3

    private V: THREE.Vector3
    private A: THREE.Vector3

    private anchor: THREE.Object3D
    private helpers: Helpers
    private cameraDir: THREE.Vector3

    size = 0.2
    dummy = 2

    constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
        this.camera = Experience.camera.instance

        this.helpers = new Helpers()

        this.S1 = new THREE.Vector3()
        this.S2 = new THREE.Vector3()

        this.V = new THREE.Vector3()
        this.A = new THREE.Vector3()

        this.cameraDir = new THREE.Vector3()
        this.camera.getWorldDirection(this.cameraDir)

        this.tween = new Tween()
    }

    setModel(model: GLTF) {
        if (!model) {
            throw new Error('Oops! Forgot to pass the model?')
        } else {
            this.model = model
            this.scene.add(this.model.scene)

            this.model.scene.position.x = this.S1.x
        }
    }

    update() {
        this.V = this.V.add(this.A)

        // this.V.x = Math.min(this.V.x, this.)
        // this.V.x = Math.max(this.V.x, -max_velocity_x)
        //
        // this.V.y = Math.min(this.V.y, max_velocity_z)
        // this.V.y = Math.max(this.V.y, -max_velocity_z)

        this.S2 = this.S1.add(this.V)

        this.model.scene.position.x = this.S2.x
        this.model.scene.position.z = this.S2.y

        this.anchor.position.x = this.model.scene.position.x

        // const C = this.camera.position.clone()
        // this.camera.getWorldPosition(C)
        // const M = this.model.scene.position.clone()

        // const X = M.sub(C)
        this.camera.getWorldDirection(this.cameraDir)

        // if (this.helpers) this.helpers.removeArrowHelper()
        // this.helpers.showArrowHelper(this.cameraDir, this.model.scene.position, 2, '#ffffff')

        // this.model.scene.rotation.y = THREE.MathUtils.damp(
        //     this.model.scene.rotation.y,
        //     this.anchor.rotation.y,
        //     2,
        //     this.time.delta
        // )
    }

    onMouseMove(e: MouseEvent) {
        this.tween.debounce(
            6,
            () => {
                this.anchor.rotation.y = THREE.MathUtils.damp(
                    this.anchor.rotation.y,
                    this.anchor.rotation.y - e.movementX * 0.005,
                    2,
                    this.time.delta
                )

                // this.anchor.rotation.y -= e.movementX * 0.0002 * this.time.delta
                // this.anchor.rotation.x += e.movementY * 0.0002 * this.time.delta

                this.anchor.rotation.x = THREE.MathUtils.damp(
                    this.anchor.rotation.y,
                    this.anchor.rotation.x + e.movementY * 0.005,
                    2,
                    this.time.delta
                )
            },
            'rotate-character'
        )
    }

    setControls() {
        if (!this.model) {
            throw new Error('Oops! You need to call the setModel first')
        } else {
            this.anchor = new THREE.Object3D()
            this.anchor.position.set(0, 0, 0)
            this.scene.add(this.anchor)

            // Parent camera to anchor
            this.anchor.add(this.camera)
            this.anchor.rotation.order = 'YXZ'

            this.controls = new Controls()
            this.controls.setContols((e: MouseEvent) => this.onMouseMove(e))

            // Move forward
            this.controls.on('w_pressed', () => {
                // this.A = this.A.add(
                //   new THREE.Vector3(
                //     Math.max(step_acceleration_x, max_acceleration_x),
                //     0,
                //     Math.max(step_acceleration_z, max_acceleration_z)
                //   )
                // )

                const frequency = 800
                const dampFactor = 5

                const dT = this.time.delta * (1 / 1000) * dampFactor

                this.tween.to(
                    frequency,
                    _ => {
                        this.model.scene.rotation.y = THREE.MathUtils.damp(
                            this.model.scene.rotation.y,
                            this.anchor.rotation.y,
                            2,
                            dT
                        )
                    },
                    'lerp-me'
                )
            })

            this.controls.on('w_released', () => {
                this.A.x = 0
                this.A.y = 0
            })

            // Move backward
            this.controls.on('s_pressed', () => {
                console.log(this.model.scene.rotation.y, this.anchor.rotation.y)
                // this.A = this.A.add(
                //   new THREE.Vector3(
                //     -Math.max(step_acceleration_x, max_acceleration_x),
                //     0,
                //     -Math.max(step_acceleration_z, max_acceleration_z)
                //   )
                // )
            })

            this.controls.on('s_released', () => {
                this.A.x = 0
                this.A.y = 0
            })
        }
    }
}
