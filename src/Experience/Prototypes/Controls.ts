import { EventEmitter } from '../Utils/EventEmitter'
import { GLOBAL_KEY_CODES } from '../constants/keybindings'

export default class Controls extends EventEmitter {
    constructor() {
        super()

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.onKeyDown(e)
        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            this.onKeyUp(e)
        })
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
