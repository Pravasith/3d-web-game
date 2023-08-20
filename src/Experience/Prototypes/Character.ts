import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'
import Tween from '../Tween'

export default class Character {
    model: GLTF

    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: Controls
    private time: Time
    private tween: Tween

    private max_velocity_z = 0.5
    private max_acceleration_z = 0.05
    private acceleration_z = 0.005

    private mass: number = 5

    private S_v: THREE.Vector2 // Displacement
    private V_v: THREE.Vector2 // Velocity
    private A_v: THREE.Vector2 // Acceleration

    private anchor: THREE.Object3D
    private CameraDir_v: THREE.Vector3

    constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
        this.camera = Experience.camera.instance

        // this.helpers = new Helpers()

        this.S_v = new THREE.Vector2()
        this.V_v = new THREE.Vector2()
        this.A_v = new THREE.Vector2()

        this.CameraDir_v = new THREE.Vector3()
        this.camera.getWorldDirection(this.CameraDir_v)

        this.tween = new Tween()
    }

    setModel(model: GLTF) {
        if (!model) {
            throw new Error('Oops! Forgot to pass the model?')
        } else {
            this.model = model
            this.scene.add(this.model.scene)

            this.model.scene.position.x = this.S_v.x
        }
    }

    onMouseMove(e: MouseEvent) {
        this.tween.debounce(
            6,
            () => {
                // Character Transolation

                // Character Rotation
                this.anchor.rotation.y = THREE.MathUtils.damp(
                    this.anchor.rotation.y,
                    this.anchor.rotation.y - e.movementX * 0.0025,
                    2,
                    this.time.delta
                )

                this.anchor.rotation.x = THREE.MathUtils.damp(
                    this.anchor.rotation.y,
                    this.anchor.rotation.x + e.movementY * 0.001,
                    2,
                    this.time.delta
                )
            },
            'rotate-character'
        )
    }

    update() {
        this.V_v.add(this.A_v.clampLength(-this.max_velocity_z, this.max_velocity_z))

        this.V_v.sub(
            new THREE.Vector2(this.V_v.x * 0.01 * this.mass, this.V_v.y * 0.01 * this.mass)
        )

        this.S_v.add(this.V_v)

        this.model.scene.position.x = THREE.MathUtils.damp(
            this.model.scene.position.x,
            this.S_v.x,
            2,
            this.time.delta
        )
        this.model.scene.position.z = THREE.MathUtils.damp(
            this.model.scene.position.z,
            this.S_v.y,
            2,
            this.time.delta
        )

        this.anchor.position.copy(this.model.scene.position)

        this.camera.getWorldDirection(this.CameraDir_v)

        // if (this.helpers) this.helpers.removeArrowHelper()
        // this.helpers.showArrowHelper(this.CameraDir_v, this.model.scene.position, 2, '#ffffff')
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

            const frequency = 800
            const dampFactor = 5

            // Move forward
            this.controls.on('w_pressed', () => {
                // Character Translation
                this.A_v.add(
                    new THREE.Vector2(
                        this.CameraDir_v.x * this.acceleration_z,
                        this.CameraDir_v.z * this.acceleration_z
                    ).clampLength(-this.max_acceleration_z, this.max_acceleration_z)
                )

                console.log('--')
                console.log('V: ', this.V_v.x, this.V_v.y)
                console.log('A: ', this.A_v.x, this.A_v.y)
                console.log('Cam: ', this.CameraDir_v.x, this.CameraDir_v.y)

                // Character Rotation
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
                    'character-lerp-w'
                )
            })

            this.controls.on('w_released', () => {
                this.A_v.x = 0
                this.A_v.y = 0
            })

            // Move backward
            this.controls.on('s_pressed', () => {
                console.log(this.model.scene.rotation.y, this.anchor.rotation.y)
                // this.A_v = this.A_v.add(
                //   new THREE.Vector3(
                //     -Math.max(step_acceleration_x, max_acceleration_x),
                //     0,
                //     -Math.max(step_acceleration_z, max_acceleration_z)
                //   )
                // )
            })

            this.controls.on('s_released', () => {
                this.A_v.x = 0
                this.A_v.y = 0
            })
        }
    }
}
