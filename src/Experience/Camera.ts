import Sizes from './Utils/Sizes'
import { Experience } from './Experience'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
    sizes: Sizes
    canvas: HTMLCanvasElement
    scene: THREE.Scene
    instance: THREE.PerspectiveCamera
    controls: OrbitControls

    constructor() {
        this.scene = Experience.scene
        this.canvas = Experience.canvas
        this.sizes = Experience.sizes

        // init
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )

        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}
