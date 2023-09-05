import { Object3D, PerspectiveCamera, Scene } from 'three'
import { EventEmitter } from '../Utils/EventEmitter'
import { GLOBAL_KEY_CODES } from '../constants/keybindings'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Experience } from '../Experience'

export default class Controls extends EventEmitter {
    camera: THREE.PerspectiveCamera

    private controls: PointerLockControls
    private anchor: Object3D
    private scene: Scene
    private canvas: HTMLCanvasElement
    private isPointerLockActive: boolean = false

    constructor() {
        super()

        this.camera = Experience.camera.instance
        this.scene = Experience.scene
        this.canvas = Experience.canvas

        window.addEventListener('keypress', (e: KeyboardEvent) => {
            // TODO: https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
            this.onKeyDown(e)
        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            // TODO: https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
            this.onKeyUp(e)
        })

        this.anchor = new Object3D()
        // this.anchor.position.set(4, 4, 0)
    }

    public setControls(onMouseMove: (e: MouseEvent) => void) {
        document.body.addEventListener('click', async () => {
            this.canvas.requestPointerLock()
        })

        document.addEventListener(
            'pointerlockchange',
            () => {
                this.isPointerLockActive = !this.isPointerLockActive
                this.trigger(this.isPointerLockActive ? 'lockmouse' : 'unlockmouse')
            },
            false
        )

        this.on('lockmouse', () => {
            this.canvas.addEventListener('mousemove', onMouseMove)
        })

        this.on('unlockmouse', () => {
            this.canvas.removeEventListener('mousemove', onMouseMove)
        })
    }

    private onKeyDown(e: KeyboardEvent) {
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

    private onKeyUp(e: KeyboardEvent) {
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
