import { Experience } from '../Experience'
import * as THREE from 'three'
import Environment from './Environment'
import Resources from '../Utils/Resources'
import Plini from '../Characters/Plini'
import Helpers from '../Helpers'
import { randFloat } from 'three/src/math/MathUtils'

export default class World {
    private camera: THREE.PerspectiveCamera
    private _environment: Environment
    private resources: Resources
    private plini: Plini
    private helpers: Helpers
    private scene: THREE.Scene

    constructor() {
        this.camera = Experience.camera.instance
        this.resources = Experience.resources
        this.scene = Experience.scene

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this._environment = new Environment()
            this.plini = new Plini()

            this.camera.parent = this.plini.model.scene
        })

        this.helpers = new Helpers()
        this.helpers.showAxesHelper()

        this.deleteThis()
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

    deleteThis() {
        for (let i = 0; i < 500; i++) {
            const geometry = new THREE.SphereGeometry(0.05, 0.05, 0.05)
            const material = new THREE.MeshStandardMaterial({ color: 0xffff00 })
            const sphere = new THREE.Mesh(geometry, material)

            sphere.position.set(randFloat(-8, 8), randFloat(-8, 8), randFloat(-8, 8))

            this.scene.add(sphere)
        }
    }
}
