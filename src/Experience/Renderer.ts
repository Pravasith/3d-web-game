import Sizes from './Utils/Sizes'
import * as THREE from 'three'
import { Experience } from './Experience'
import Camera from './Camera'

export default class Renderer {
    sizes: Sizes
    canvas: HTMLCanvasElement
    scene: THREE.Scene
    camera: Camera
    instance: THREE.WebGLRenderer

    constructor() {
        this.scene = Experience.scene
        this.canvas = Experience.canvas
        this.sizes = Experience.sizes
        this.camera = Experience.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        })

        // this.instance.useLegacyLights = true
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#7a1d00')
        // this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}
