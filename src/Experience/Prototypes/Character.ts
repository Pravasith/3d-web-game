import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'

export default class Character {
    model: GLTF
    scene: THREE.Scene

    constructor(model: GLTF) {
        this.model = model
        this.scene = Experience.scene
        this.setModel()
    }

    setModel() {
        if (!this.model) return
        else {
            this.scene.add(this.model.scene)
        }
    }
}
