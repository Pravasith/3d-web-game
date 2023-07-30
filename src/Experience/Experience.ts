import Sizes from "../Utils/Sizes"

export default class Experience {
  static instance: Experience
  sizes: Sizes

  private constructor() {
    this.sizes = new Sizes()
  }

  static getInstance(): Experience {
    if (!Experience.instance) {
      Experience.instance = new Experience()
    }

    return Experience.instance
  }

}

const experience = Experience.getInstance()
