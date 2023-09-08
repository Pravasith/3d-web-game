import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'
import Tween from '../Tween'
import { PI, TAU } from '../constants/mathConstants'
import Helpers from '../Helpers'

export default class Character {
    protected model: GLTF
    protected modelRotation_y: number
    protected time: Time

    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: Controls
    private tween: Tween

    private temp = 0.2
    private readonly max_velocity = 0.5 * this.temp
    private readonly max_acceleration = 0.05 * this.temp
    private readonly acceleration = 0.005 * this.temp

    private mass: number = 5
    private turnDuration = 400 // 800
    private turnDampFactor = 6

    private S_v2: THREE.Vector2 // Displacement
    private V_v2: THREE.Vector2 // Velocity
    private A_v2: THREE.Vector2 // Acceleration

    private anchor: THREE.Object3D

    private CameraDir_v3: THREE.Vector3

    private CameraDir_v2: THREE.Vector2
    private CameraDirPlus90_v2: THREE.Vector2

    private helpers: Helpers

    private cameraDirHelper: THREE.ArrowHelper

    private modelDirHelper: THREE.ArrowHelper
    private ModelDir_v2: THREE.Vector2

    private ModelForwardDir_v3_world: THREE.Vector3
    private ModelOrigin_v3_world: THREE.Vector3

    protected constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
        this.camera = Experience.camera.instance

        this.helpers = new Helpers()

        this.S_v2 = new THREE.Vector2()
        this.V_v2 = new THREE.Vector2()
        this.A_v2 = new THREE.Vector2()

        this.CameraDir_v3 = new THREE.Vector3()
        this.CameraDir_v2 = new THREE.Vector2()
        this.CameraDirPlus90_v2 = new THREE.Vector2()

        this.ModelDir_v2 = new THREE.Vector2()

        this.camera.getWorldDirection(this.CameraDir_v3)

        this.tween = new Tween()
    }

    protected setModel(model: GLTF) {
        if (!model) {
            throw new Error('Oops! Forgot to pass the model?')
        } else {
            this.model = model
            this.scene.add(this.model.scene)

            this.model.scene.position.x = this.S_v2.x

            this.helpers.showArrowHelper(this.CameraDir_v3, this.model.scene.position, 2, '#29abe2')
            this.cameraDirHelper = this.helpers.arrowHelper

            this.helpers.showArrowHelper(this.CameraDir_v3, this.model.scene.position, 2, '#ffffff')
            this.modelDirHelper = this.helpers.arrowHelper
        }
    }

    protected setControls() {
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
                this.onMoveForwardStart()
            })

            this.controls.on('w_released', () => {
                this.A_v2.x = 0
                this.A_v2.y = 0

                this.onMoveForwardEnd()
            })

            // Move backward
            this.controls.on('s_pressed', () => {
                this.moveForwardOrBackward(-1)
                this.onMoveBackwardStart()
            })

            this.controls.on('s_released', () => {
                this.A_v2.x = 0
                this.A_v2.y = 0

                this.onMoveBackwardEnd()
            })

            // Move left
            this.controls.on('a_pressed', () => {
                this.moveLeftOrRight(1)
                this.onMoveLeftStart()
            })

            this.controls.on('a_released', () => {
                this.A_v2.x = 0
                this.A_v2.y = 0

                this.onMoveLeftEnd()
            })

            // Move backward
            this.controls.on('d_pressed', () => {
                this.moveLeftOrRight(-1)
                this.onMoveRightStart()
            })

            this.controls.on('d_released', () => {
                this.A_v2.x = 0
                this.A_v2.y = 0

                this.onMoveRightEnd()
            })
        }
    }

    protected update() {
        this.V_v2.add(this.A_v2.clampLength(-this.max_velocity, this.max_velocity))

        this.V_v2.sub(
            new THREE.Vector2(this.V_v2.x * 0.01 * this.mass, this.V_v2.y * 0.01 * this.mass)
        )

        this.S_v2.add(this.V_v2)

        this.model.scene.position.x = THREE.MathUtils.damp(
            this.model.scene.position.x,
            this.S_v2.x,
            2,
            this.time.delta
        )

        this.model.scene.position.z = THREE.MathUtils.damp(
            this.model.scene.position.z,
            this.S_v2.y,
            2,
            this.time.delta
        )

        this.anchor.position.copy(this.model.scene.position)

        this.camera.getWorldDirection(this.CameraDir_v3)
        this.CameraDir_v2.x = this.CameraDir_v3.x
        this.CameraDir_v2.y = this.CameraDir_v3.z
        this.CameraDir_v2.normalize()

        this.cameraDirHelper.position.copy(this.model.scene.position)
        this.cameraDirHelper.setDirection(
            new THREE.Vector3(this.CameraDir_v2.x, 0, this.CameraDir_v2.y)
        )

        this.modelDirHelper.position.copy(this.model.scene.position)
        this.modelDirHelper.setDirection(
            new THREE.Vector3(this.ModelDir_v2.x, 0, this.ModelDir_v2.y)
        )

        this.ModelForwardDir_v3_world = this.model.scene.localToWorld(new THREE.Vector3(0, 0, 1))
        this.ModelOrigin_v3_world = this.model.scene.localToWorld(new THREE.Vector3())

        this.ModelForwardDir_v3_world.sub(this.ModelOrigin_v3_world)
        this.ModelForwardDir_v3_world.normalize()

        this.ModelDir_v2.x = this.ModelForwardDir_v3_world.x
        this.ModelDir_v2.y = this.ModelForwardDir_v3_world.z
        this.ModelDir_v2.normalize()
    }

    protected onMoveForwardStart() {}
    protected onMoveBackwardStart() {}
    protected onMoveLeftStart() {}
    protected onMoveRightStart() {}

    protected onMoveForwardEnd() {}
    protected onMoveBackwardEnd() {}
    protected onMoveLeftEnd() {}
    protected onMoveRightEnd() {}

    private onMouseMove(e: MouseEvent) {
        this.tween.debounce(
            6,
            () => {
                // Character Rotation
                this.anchor.rotation.y =
                    (this.anchor.rotation.y - e.movementX * 0.0001 * this.time.delta) % TAU

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

    private moveForwardOrBackward(dir: 1 | -1) {
        // Character Translation
        this.CameraDir_v2.multiplyScalar(dir)

        this.A_v2.add(
            new THREE.Vector2(
                this.CameraDir_v2.x * this.acceleration,
                this.CameraDir_v2.y * this.acceleration
            ).clampLength(-this.max_acceleration, this.max_acceleration)
        )

        // Character Rotation
        this.tween.to(
            this.turnDuration,
            _ => {
                this.model.scene.rotation.y = THREE.MathUtils.damp(
                    this.model.scene.rotation.y,
                    this.model.scene.rotation.y +
                        -Math.sign(dir * this.ModelDir_v2.cross(this.CameraDir_v2)) *
                            +Math.acos(dir * this.ModelDir_v2.dot(this.CameraDir_v2)).toFixed(4),
                    2,
                    this.time.delta * this.turnDampFactor * 0.004
                )
            },
            'character-lerp-' + (!(dir + 1) ? 's' : 'w')
        )
    }

    private moveLeftOrRight(dir: 1 | -1) {
        // Rotate a vector by 90 degrees trick
        // See - https://limnu.com/sketch-easy-90-degree-rotate-vectors/
        this.CameraDirPlus90_v2.x = dir * this.CameraDir_v2.y
        this.CameraDirPlus90_v2.y = dir * -this.CameraDir_v2.x

        // Character Translation
        this.A_v2.add(
            new THREE.Vector2(
                this.CameraDirPlus90_v2.x * this.acceleration,
                this.CameraDirPlus90_v2.y * this.acceleration
            ).clampLength(-this.max_acceleration, this.max_acceleration)
        )

        // Character Rotation
        this.tween.to(
            this.turnDuration,
            _ => {
                this.model.scene.rotation.y = THREE.MathUtils.damp(
                    this.model.scene.rotation.y,
                    this.model.scene.rotation.y +
                        -Math.sign(this.ModelDir_v2.cross(this.CameraDirPlus90_v2)) *
                            +Math.acos(this.ModelDir_v2.dot(this.CameraDirPlus90_v2)).toFixed(4),
                    2,
                    this.time.delta * 0.004 * this.turnDampFactor
                )
            },
            'character-lerp-' + (!(dir + 1) ? 'd' : 'a')
        )
    }
}
