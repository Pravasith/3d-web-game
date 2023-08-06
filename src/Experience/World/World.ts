import { Experience } from '../Experience'
import * as THREE from 'three'
import Environment from './Environment'
import Resources from '../Utils/Resources'
import Plini from '../Characters/Plini'

export default class World {
    private scene: THREE.Scene
    private environment: Environment
    private resources: Resources
    private plini: Plini

    constructor() {
        this.scene = Experience.scene
        this.resources = Experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.environment = new Environment()
            this.plini = new Plini()
        })
    }

    update() {
        if (this.plini) this.plini.update()
    }
}
