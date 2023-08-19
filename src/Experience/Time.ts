import { EventEmitter } from './Utils/EventEmitter'

export default class Time extends EventEmitter {
    public start: number
    public current: number
    public elapsed: number
    public delta: number

    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()

        this.delta = currentTime - this.current
        this.current = currentTime

        // in Seconds
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}
