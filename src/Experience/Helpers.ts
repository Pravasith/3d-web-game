import { ArrowHelper, AxesHelper, Scene, Vector3 } from 'three'
import { Experience } from './Experience'

export default class Helpers {
    arrowHelper: ArrowHelper

    private axesHelper: AxesHelper
    private scene: Scene

    constructor() {
        this.scene = Experience.scene
    }

    showAxesHelper() {
        this.axesHelper = new AxesHelper()
        this.scene.add(this.axesHelper)
    }

    removeAxesHelper() {
        if (this.axesHelper) {
            this.axesHelper.dispose()
            this.scene.remove(this.axesHelper)
        }
    }

    showArrowHelper(dir: Vector3, origin: Vector3, length: number, hex: string) {
        this.arrowHelper = new ArrowHelper(dir, origin, length, hex)
        this.scene.add(this.arrowHelper)
    }

    removeArrowHelper() {
        if (this.arrowHelper) {
            this.arrowHelper.dispose()
            this.scene.remove(this.arrowHelper)
        }
    }
}
