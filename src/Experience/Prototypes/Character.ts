import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'
import Tween from '../Tween'
import { PI, TAU } from '../constants/mathConstants'
import Helpers from '../Helpers'

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
    // private turnDuration = 2000 // 800
    private turnDuration = 800 // 800
    private turnDampFactor = 5

    private S_v: THREE.Vector2 // Displacement
    private V_v: THREE.Vector2 // Velocity
    private A_v: THREE.Vector2 // Acceleration

    private anchor: THREE.Object3D
    private CameraDir_v: THREE.Vector3
    private CameraDir_Hor_Plane: THREE.Vector2

    helpers: Helpers

    cameraDirHelper: THREE.ArrowHelper
    modelDirHelper: THREE.ArrowHelper
    modelPointer_V: THREE.Vector2

    constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
        this.camera = Experience.camera.instance

        this.helpers = new Helpers()

        this.S_v = new THREE.Vector2()
        this.V_v = new THREE.Vector2()
        this.A_v = new THREE.Vector2()

        this.CameraDir_v = new THREE.Vector3()
        this.CameraDir_Hor_Plane = new THREE.Vector2()

        this.modelPointer_V = new THREE.Vector2()

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

            this.helpers.showArrowHelper(this.CameraDir_v, this.model.scene.position, 2, '#29abe2')
            this.cameraDirHelper = this.helpers.arrowHelper

            this.helpers.showArrowHelper(this.CameraDir_v, this.model.scene.position, 2, '#ffffff')
            this.modelDirHelper = this.helpers.arrowHelper
        }
    }

    onMouseMove(e: MouseEvent) {
        this.tween.debounce(
            6,
            () => {
                // Character Rotation
                this.anchor.rotation.y =
                    this.anchor.rotation.y - e.movementX * 0.0001 * this.time.delta

                // this.anchor.rotation.y = THREE.MathUtils.damp(
                //     this.anchor.rotation.y,
                //     this.anchor.rotation.y - e.movementX * 0.0025,
                //     2,
                //     this.time.delta * 100
                // )

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

        // The sexiest function known to man
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
        this.CameraDir_Hor_Plane.x = this.CameraDir_v.x
        this.CameraDir_Hor_Plane.y = this.CameraDir_v.z
        this.CameraDir_Hor_Plane.normalize()

        // if (this.helpers) this.helpers.removeArrowHelper()
        // this.helpers.showArrowHelper(this.CameraDir_v, this.model.scene.position, 2, '#ffffff')

        this.cameraDirHelper.position.copy(this.model.scene.position)
        this.cameraDirHelper.setDirection(
            new THREE.Vector3(this.CameraDir_Hor_Plane.x, 0, this.CameraDir_Hor_Plane.y)
        )

        this.modelDirHelper.position.copy(this.model.scene.position)
        this.modelDirHelper.setDirection(
            new THREE.Vector3(this.modelPointer_V.x, 0, this.modelPointer_V.y)
        )

        const temp_V = this.model.scene.localToWorld(new THREE.Vector3(0, 0, 2))
        const temp_V2 = this.model.scene.localToWorld(new THREE.Vector3(0, 0, 1))

        temp_V.sub(temp_V2)
        temp_V.normalize()

        this.modelPointer_V = new THREE.Vector2(temp_V.x, temp_V.z)
        this.modelPointer_V.normalize()
    }

    moveForwardOrBackward(dir: 1 | -1) {
        // Character Translation
        this.A_v.add(
            new THREE.Vector2(
                dir * this.CameraDir_Hor_Plane.x * this.acceleration_z,
                dir * this.CameraDir_Hor_Plane.y * this.acceleration_z
            ).clampLength(-this.max_acceleration_z, this.max_acceleration_z)
        )

        // console.log('--')
        // console.log('V: ', this.V_v.x, this.V_v.y)
        // console.log('A: ', this.A_v.x, this.A_v.y)
        // console.log('Cam: ', this.CameraDir_v.x, this.CameraDir_v.y)
        // this.v1.copy(this.model.scene.up).applyQuaternion(this.anchor.quaternion)

        // console.log(this.CameraDir_Hor_Plane)

        const finalValue = Math.acos(this.modelPointer_V.dot(this.CameraDir_Hor_Plane))
        console.log(finalValue)

        // Character Rotation
        this.tween.to(
            this.turnDuration,
            _ => {
                this.model.scene.rotation.y = THREE.MathUtils.damp(
                    this.model.scene.rotation.y,
                    this.anchor.rotation.y,
                    2,
                    this.time.delta * 0.001 * this.turnDampFactor
                )
            },
            'character-lerp-' + (!(dir + 1) ? 's' : 'w')
        )
    }

    moveLeftOrRight(dir: 1 | -1) {
        // Character Translation
        this.A_v.add(
            new THREE.Vector2(
                // Rotate a vector trick
                // See - https://limnu.com/sketch-easy-90-degree-rotate-vectors/
                dir * this.CameraDir_v.z * this.acceleration_z,
                dir * -this.CameraDir_v.x * this.acceleration_z
            ).clampLength(-this.max_acceleration_z, this.max_acceleration_z)
        )

        // Character Rotation
        this.tween.to(
            this.turnDuration,
            _ => {
                this.model.scene.rotation.y = THREE.MathUtils.damp(
                    this.model.scene.rotation.y,
                    this.anchor.rotation.y + (dir * PI) / 2,
                    2,
                    this.time.delta * 0.001 * this.turnDampFactor
                )
            },
            'character-lerp-' + (!(dir + 1) ? 'd' : 'a')
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
            this.controls.setControls((e: MouseEvent) => this.onMouseMove(e))

            // Move forward
            this.controls.on('w_pressed', () => {
                this.moveForwardOrBackward(1)
                // console.log('W')
            })

            this.controls.on('w_released', () => {
                this.A_v.x = 0
                this.A_v.y = 0
            })

            // Move backward
            this.controls.on('s_pressed', () => {
                this.moveForwardOrBackward(-1)
                // console.log('S')
            })

            this.controls.on('s_released', () => {
                this.A_v.x = 0
                this.A_v.y = 0
            })

            // Move left
            this.controls.on('a_pressed', () => {
                this.moveLeftOrRight(1)
            })

            this.controls.on('a_released', () => {
                this.A_v.x = 0
                this.A_v.y = 0
            })

            // Move backward
            this.controls.on('d_pressed', () => {
                this.moveLeftOrRight(-1)
            })

            this.controls.on('d_released', () => {
                this.A_v.x = 0
                this.A_v.y = 0
            })
        }
    }
}
