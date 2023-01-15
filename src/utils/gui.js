import GUI from "lil-gui"

const gui = new GUI()

class GlobalGuiParameters {
    parameters = {}

    add(param, value) {
        this.parameters[param] = value
    }
}
