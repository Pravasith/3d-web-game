import Sizes from '../Utils/Sizes'

export class Experience {
    static instance: Experience
    sizes: Sizes
    canvas: HTMLCanvasElement

    private constructor(canvas: HTMLCanvasElement) {
        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.sizes.on('resize', () => {
            console.log('XX')
        })
    }

    static getInstance(): Experience {
        const canvas = document.querySelector<HTMLCanvasElement>('canvas#webgl')

        if (!Experience.instance && canvas) {
            Experience.instance = new Experience(canvas)
        }

        return Experience.instance
    }
}
