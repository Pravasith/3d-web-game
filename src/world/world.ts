import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

class World {
    private rafID: number
    private elapsedTime: number

    static instance: World
    static renderer: THREE.WebGLRenderer
    static camera: THREE.PerspectiveCamera
    static scene: THREE.Scene
    static clock: THREE.Clock

    private constructor(canvas: HTMLCanvasElement) {
        // Canvas
        if (!canvas) throw new Error("You must pass a canvas in.")

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        World.camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.5,
            800
        )

        World.camera.position.z = 1
        World.scene = new THREE.Scene()

        World.renderer = new THREE.WebGLRenderer({ canvas, })
        World.renderer.setSize(sizes.width, sizes.height)
        World.renderer.render(World.scene, World.camera)
        World.renderer.physicallyCorrectLights = true

        World.clock = new THREE.Clock()

        // Controls
        // TODO: Move this
        const controls = new OrbitControls(World.camera, canvas)
    }

    static init(canvas: HTMLCanvasElement) {
        if (!World.instance) {
            World.instance = new World(canvas)
        }

        return World.instance
    }

    static ticker(world: World) {
        this.instance.elapsedTime = World.clock.getElapsedTime()
        World.renderer.render(World.scene, World.camera)

        this.instance.rafID = requestAnimationFrame(() => World.ticker(World.instance))
        this.instance.updateWorld()
    }

    updateWorld() {
        // Register all updatables 
        // And run all the update() methods 
        // of those updatables
    }

    static startRaf() {
        World.ticker(this.instance)
    }

    static endRaf() {
        if (this.instance.rafID)
            cancelAnimationFrame(this.instance.rafID)
    }

    add(obj: THREE.Object3D | THREE.Mesh) {
        if (!obj)
            throw new Error("you must pass the object to add to the Scene")

        World.scene.add(obj)
    }
}

export default World
