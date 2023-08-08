import { AxesHelper, Scene } from 'three'
import { Experience } from './Experience'

export default class Helpers {
    private axesHelper: AxesHelper
    private scene: Scene

    constructor() {
        this.axesHelper = new AxesHelper()
        this.scene = Experience.scene
    }

    showAxesHelper() {
        this.scene.add(this.axesHelper)
    }

    removeAxesHelper() {
        this.scene.remove(this.axesHelper)
    }
}
