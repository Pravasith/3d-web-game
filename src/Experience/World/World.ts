import { Experience } from '../Experience'
import * as THREE from 'three'
import Environment from './Environment'

export default class World {
    scene: THREE.Scene
    environment: Environment

    constructor() {
        this.scene = Experience.scene

        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({})
        )

        this.scene.add(testMesh)

        this.environment = new Environment()
    }
}
