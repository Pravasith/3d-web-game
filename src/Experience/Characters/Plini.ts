import { Scene } from 'three'
import Character from '../Prototypes/Character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import Resources from '../Utils/Resources'
import { LOAD_ITEMS } from '../sources'

export default class Plini extends Character {
    model: GLTF
    // resource: any

    constructor() {
        const model = Experience.resources.items[LOAD_ITEMS.PLINI_MODEL] as GLTF
        super(model)

        this.model = model
    }
}
