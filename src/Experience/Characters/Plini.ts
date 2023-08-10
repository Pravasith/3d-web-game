import Character from '../Prototypes/Character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Experience } from '../Experience'
import { LOAD_ITEMS } from '../constants/sources'
import { Mesh, MeshPhongMaterial } from 'three'

export default class Plini extends Character {
    constructor() {
        const model = Experience.resources.items[LOAD_ITEMS.PLINI_MODEL] as GLTF
        super()

        this.setModel(model)
        this.setControls()
        const material = new MeshPhongMaterial({ color: '#fcba03' })

        model.scene.traverse((o: Mesh) => {
            if (o.isMesh) {
                // console.log(o)
                o.material = material
            }
        })
    }
}
