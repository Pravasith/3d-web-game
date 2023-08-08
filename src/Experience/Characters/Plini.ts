import Character from '../Prototypes/Character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import { LOAD_ITEMS } from '../constants/sources'

export default class Plini extends Character {
    constructor() {
        const model = Experience.resources.items[LOAD_ITEMS.PLINI_MODEL] as GLTF
        super()

        this.setModel(model)
        this.setControls()
    }
}
