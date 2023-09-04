import GUI from 'lil-gui'

export default class Debug {
    private active: boolean = false
    private ui: GUI

    constructor() {
        this.active = window.location.hash === '#debug'

        if (this.active) {
            this.ui = new GUI()
        }
    }
}
