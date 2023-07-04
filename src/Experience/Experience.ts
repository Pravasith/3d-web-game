import Sizes from "../Utils/Sizes"

export default class Experience {
    static instance: Experience
    sizes: Sizes

    private constructor() {
        if (Experience.instance)
            return Experience.instance
        else {
            // init experience
        }

        this.sizes = new Sizes()
    }
}
