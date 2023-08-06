import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'
import Time from '../Time'
import * as THREE from 'three'

const max_velocity = 0.04
const max_acceleration = 0.0004
const step_acceleration = 0.0001

export default class Character {
    protected model: GLTF

    private scene: THREE.Scene
    private controls: Controls
    private time: Time

    private S1 = new THREE.Vector2(3, 0)
    private S2 = new THREE.Vector2()

    private V = new THREE.Vector2()
    private A = new THREE.Vector2()

    constructor() {
        this.scene = Experience.scene
        this.time = Experience.time
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
        // const { x } = this.model.scene.position

        // if (x < -0.1) {
        //     this.A = new THREE.Vector2(0.0002, 0)
        // } else if (x > 0.1) {
        //     this.A = new THREE.Vector2(-0.0002, 0)
        // } else console.log(x)

        // Update logic
        // this.V = this.V.add(this.A)
        this.V = this.V.add(this.A)

        this.V.x = Math.min(this.V.x, max_velocity)
        this.V.x = Math.max(this.V.x, -max_velocity)

        this.S2 = this.S1.add(this.V)

        this.model.scene.position.x = this.S2.x
    }

    setControls() {
        this.controls = new Controls()

        // Move forward
        this.controls.on('w_pressed', () => {
            this.A = this.A.add(
                new THREE.Vector2(Math.max(-step_acceleration, -max_acceleration), 0)
            )
            // console.log(this.V.x, this.A.y)
        })

        this.controls.on('w_released', () => {
            this.A.x = 0
            // console.log(this.V.x, this.A.y)
        })

        // Move backward
        this.controls.on('s_pressed', () => {
            this.A = this.A.add(new THREE.Vector2(Math.max(step_acceleration, max_acceleration), 0))
            console.log(this.V.x, this.A.y)
        })

        this.controls.on('s_released', () => {
            this.A.x = 0
            // console.log(this.V.x, this.A.y)
        })
    }
}
