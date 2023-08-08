import { Object3D, Scene } from 'three'
import { EventEmitter } from '../Utils/EventEmitter'
import { GLOBAL_KEY_CODES } from '../constants/keybindings'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Experience } from '../Experience'

export default class Controls extends EventEmitter {
    camera: THREE.PerspectiveCamera

    private controls: PointerLockControls
    private anchor: Object3D
    private webglContainer: HTMLElement | null
    private scene: Scene

    constructor() {
        super()

        this.camera = Experience.camera.instance
        this.scene = Experience.scene

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.onKeyDown(e)
        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            this.onKeyUp(e)
        })

        this.anchor = new Object3D()
        this.anchor.position.set(0, 4, 4)

        this.setContols()
    }

    setContols() {
        this.webglContainer = document.getElementById('webgl-container')

        if (this.webglContainer) {
            // this.anchor.add(this.camera)
            this.controls = new PointerLockControls(this.camera, this.webglContainer)
            this.scene.add(this.controls.getObject())

            this.webglContainer.addEventListener('click', () => {
                ;(this.controls as PointerLockControls).lock()
            })
        }
    }

    onKeyDown(e: KeyboardEvent) {
        switch (e.code) {
            case GLOBAL_KEY_CODES.W:
                this.trigger('w_pressed')
                break

            case GLOBAL_KEY_CODES.A:
                this.trigger('a_pressed')
                break

            case GLOBAL_KEY_CODES.S:
                this.trigger('s_pressed')
                break

            case GLOBAL_KEY_CODES.D:
                this.trigger('d_pressed')
                break

            default:
                // console.log('')
                break
        }
    }

    onKeyUp(e: KeyboardEvent) {
        switch (e.code) {
            case GLOBAL_KEY_CODES.W:
                this.trigger('w_released')
                break

            case GLOBAL_KEY_CODES.A:
                this.trigger('a_released')
                break

            case GLOBAL_KEY_CODES.S:
                this.trigger('s_released')
                break

            case GLOBAL_KEY_CODES.D:
                this.trigger('d_released')
                break

            default:
                // console.log('')
                break
        }
        // this.trigger('resize')
    }
}
