import * as THREE from 'three'
import { Experience } from '../Experience'

export default class Environment {
    scene: THREE.Scene
    sunLight: THREE.DirectionalLight

    constructor() {
        this.scene = Experience.scene
        this.setSunLight()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#db3300', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(2, 3.5, -1.25)

        this.scene.add(this.sunLight)
    }
}
