import { Experience } from '../Experience'
import * as THREE from 'three'
import Environment from './Environment'
import Resources from '../Utils/Resources'
import Plini from '../Characters/Plini'
import Helpers from '../Helpers'
import { randFloat } from 'three/src/math/MathUtils'
import { LOAD_ITEMS } from '../constants/sources'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export default class World {
    private camera: THREE.PerspectiveCamera
    private _environment: Environment
    private resources: Resources
    private plini: Plini
    private helpers: Helpers
    private scene: THREE.Scene
    private terrain: GLTF

    constructor() {
        this.camera = Experience.camera.instance
        this.resources = Experience.resources
        this.scene = Experience.scene

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this._environment = new Environment()

            this.plini = new Plini()

            this.terrain = Experience.resources.items[LOAD_ITEMS.TERRAIN] as GLTF
            const material = new THREE.MeshStandardMaterial({ color: '#db3300' })

            this.terrain.scene.traverse(o => {
                if ((o as THREE.Mesh).isMesh) {
                    ;(o as THREE.Mesh).material = material
                }
            })
            this.terrain.scene.position.y = -40

            this.scene.add(this.terrain.scene)
            const cubeMap = Experience.resources.items[LOAD_ITEMS.ENV_MAP_TEXTURE]
            // this.scene.background = cubeMap
            // this._environment.spotLight.target.copy(this.plini.model.scene)
        })

        this.helpers = new Helpers()
        this.helpers.showAxesHelper()
    }

    update() {
        if (this.plini) {
            // this.plini.model.scene.rotation.order = 'YXZ'
            this.plini.update()
            // this.camera.lookAt(this.plini.model.scene.position)
            // this.camera.position.x = this.plini.model.scene.position.x + 4
            // this.camera.position.z = this.plini.model.scene.position.z + 0
        }
    }
}
