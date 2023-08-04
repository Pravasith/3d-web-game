import { EventEmitter } from '../Utils/EventEmitter'
import { GLOBAL_KEY_CODES } from '../constants/keybindings'

export default class Controls extends EventEmitter {
    constructor() {
        super()

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.onKeyDown(e)
        })
    }

    onKeyDown(e: KeyboardEvent) {
        switch (e.code) {
            case GLOBAL_KEY_CODES.W:
                this.trigger('moveForward')
                break

            case GLOBAL_KEY_CODES.A:
                // console.log('a')
                break

            case GLOBAL_KEY_CODES.S:
                this.trigger('moveBackward')
                // console.log('s')
                break

            case GLOBAL_KEY_CODES.D:
                // console.log('d')
                break

            default:
                // console.log(e)
                break
        }
        // this.trigger('resize')
    }
}
