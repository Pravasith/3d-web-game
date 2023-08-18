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

    to(duration: number, callback: (timeElapsed: number) => void, uId: string) {
        if (!this.to_uIds.has(uId)) {
            this.to_uIds.add(uId)
            let iId: number
            let timeElapsed = 0

            iId = setInterval(() => {
                if (timeElapsed <= duration) {
                    timeElapsed++
                    callback(timeElapsed)
                } else {
                    clearInterval(iId)
                    this.to_uIds.delete(uId)
                    // console.log(timeElapsed)
                    timeElapsed = 0
                }
            }, 1)
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
