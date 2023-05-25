import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

class World {
    public renderer: THREE.WebGLRenderer
    public camera: THREE.PerspectiveCamera
    public scene: THREE.Scene
    public clock: THREE.Clock

    private rafID: number
    private elapsedTime: number

    constructor(canvas: HTMLCanvasElement) {
        // Canvas
        if (!canvas) throw new Error("You must pass a canvas in.")

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.5,
            800
        )

        this.camera.position.z = 1

        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({
            canvas,
        })
        this.renderer.setSize(sizes.width, sizes.height)
        this.renderer.render(this.scene, this.camera)
        this.renderer.physicallyCorrectLights = true

        this.clock = new THREE.Clock()

        // Controls
        const controls = new OrbitControls(this.camera, canvas)
        console.log(controls)
    }

    ticker() {
        this.elapsedTime = this.clock.getElapsedTime()
        this.renderer.render(this.scene, this.camera)
        this.rafID = requestAnimationFrame(() => this.ticker())
    }


    startRaf() {
        this.ticker()
    }

    endRaf() {
        if (this.rafID)
            cancelAnimationFrame(this.rafID)
    }

    add(obj: THREE.Object3D | THREE.Mesh) {
        if (!obj)
            throw new Error("you must pass the object to add to the Scene")

        this.scene.add(obj)
    }

}

export default World
