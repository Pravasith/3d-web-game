import { Experience } from './Experience'
import Time from './Time'

export default class Tween {
    private time: Time
    private debounce_uIds: Set<string>
    private to_uIds: Set<string>

    constructor() {
        this.time = Experience.time
        this.debounce_uIds = new Set()
        this.to_uIds = new Set()
    }

    to(frequency: number, callback: (timeElapsed: number) => void, uId: string) {
        let startTime = this.time.current

        if (!this.to_uIds.has(uId)) {
            this.to_uIds.add(uId)
            let timeElapsed = this.time.current - startTime

            const tick = () => {
                if (timeElapsed <= frequency) {
                    timeElapsed = this.time.current - startTime

                    callback(timeElapsed)

                    window.requestAnimationFrame(() => {
                        tick()
                    })
                } else {
                    this.to_uIds.delete(uId)
                    timeElapsed = this.time.current
                    // console.log('loop finished')
                }
            }

            window.requestAnimationFrame(() => {
                tick()
            })
        }
    }

    debounce(duration: number, callback: () => void, uId: string) {
        if (!this.debounce_uIds.has(uId)) {
            this.debounce_uIds.add(uId)

            let tId: number

            tId = setTimeout(() => {
                callback()
                clearTimeout(tId)

                this.debounce_uIds.delete(uId)
            }, duration)
        }
    }
}
