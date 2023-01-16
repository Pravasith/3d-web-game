import GUI from "lil-gui"

export class GlobalGUI extends GUI {
    parameters = {}

    addParam(param, value) {
        this.parameters[param] = value
    }

    get params() {
        return this.parameters
    }
}
