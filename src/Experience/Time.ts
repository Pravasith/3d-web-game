import { EventEmitter } from './Utils/EventEmitter'

export default class Time extends EventEmitter {
    start: number
    currrent: number
    elapsed: number
    delta: number

    constructor() {
        super()

        this.start = Date.now()
        this.currrent = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()

        this.delta = currentTime - this.currrent
        this.currrent = currentTime
        this.elapsed = this.currrent - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}
