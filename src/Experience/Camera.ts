import Sizes from './Utils/Sizes'
import { Experience } from './Experience'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
    instance: THREE.PerspectiveCamera

    private sizes: Sizes
    private canvas: HTMLCanvasElement
    private scene: THREE.Scene
    private controls: OrbitControls

    constructor() {
        this.scene = Experience.scene
        this.canvas = Experience.canvas
        this.sizes = Experience.sizes

        // init
        this.setInstance()

        // this.setOrbitControls()
        // this.setPointerLockControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            1000
        )

        this.instance.position.set(0, 0, 0)
        this.scene.add(this.instance)

        this.instance.position.set(0, 4, -10)
        this.instance.lookAt(0, 0, 0)
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
        if (typeof this.controls === typeof OrbitControls) {
            ;(this.controls as OrbitControls).update()
        }
    }
}
