import GUI from 'lil-gui'

export default class Debug {
    protected ui: GUI

    private active: boolean = false

    constructor() {
        this.active = window.location.hash === '#debug'

        if (this.active) {
            this.ui = new GUI()
        }
    }
}
