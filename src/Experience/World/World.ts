import { Experience } from '../Experience'
import * as THREE from 'three'
import Environment from './Environment'
import Resources from '../Utils/Resources'
import Plini from '../Characters/Plini'

export default class World {
    scene: THREE.Scene
    environment: Environment
    resources: Resources

    constructor() {
        this.scene = Experience.scene
        this.resources = Experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.environment = new Environment()

            const plini = new Plini()
            plini.setModel()
        })
    }
}
