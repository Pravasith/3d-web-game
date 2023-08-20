import * as THREE from 'three'
import { Experience } from '../Experience'

export default class Environment {
    scene: THREE.Scene
    sunLight: THREE.DirectionalLight
    ambientLight: THREE.AmbientLight
    spotLight: THREE.SpotLight

    constructor() {
        this.scene = Experience.scene
        this.setSunLight()
    }

    setSunLight() {
        this.spotLight = new THREE.SpotLight(0xffffff, 10)
        this.spotLight.position.set(0, -1, -25)
        this.spotLight.angle = Math.PI / 16
        this.spotLight.penumbra = 1
        this.spotLight.decay = 2
        this.spotLight.distance = 0

        this.spotLight.castShadow = true
        this.spotLight.shadow.mapSize.width = 1024
        this.spotLight.shadow.mapSize.height = 1024
        this.spotLight.shadow.camera.near = 1
        this.spotLight.shadow.camera.far = 10
        this.spotLight.shadow.focus = 1
        this.scene.add(this.spotLight)

        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.05)
        // this.scene.add(this.ambientLight)

        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(10, 3.5, -10)

        this.scene.add(this.sunLight)
    }
}
