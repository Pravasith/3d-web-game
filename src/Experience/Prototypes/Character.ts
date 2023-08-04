import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Controls from './Controls'

export default class Character {
    protected model: GLTF

    private scene: THREE.Scene
    private controls: Controls

    constructor() {
        this.scene = Experience.scene
        this.setControls()
    }

    setModel(model: GLTF) {
        if (!model) {
            throw new Error('Oops! Forgot to pass the model?')
        } else {
            this.model = model
            this.scene.add(this.model.scene)
        }
    }

    setControls() {
        this.controls = new Controls()

        this.controls.on('moveForward', () => {
            this.model.scene.position.x += 0.1
        })

        this.controls.on('moveBackward', () => {
            this.model.scene.position.x -= 0.1
        })
    }
}
