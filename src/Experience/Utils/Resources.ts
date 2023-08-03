import { ISource, LOAD_ITEMS } from '../sources'
import { EventEmitter } from './EventEmitter'
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

type LoadersType = {
    gltfLoader?: GLTFLoader
    textureLoader?: THREE.TextureLoader
    cubeTextureLoader?: THREE.CubeTextureLoader
}

type FileTypes<T> = T extends GLTF
    ? GLTF
    : T extends THREE.Texture
    ? THREE.Texture
    : THREE.CubeTexture

type ItemsType = Record<LOAD_ITEMS, FileTypes<GLTF | THREE.CubeTexture | THREE.Texture>>

export default class Resources extends EventEmitter {
    sources: ISource[]
    items: ItemsType
    toLoad: number
    loaded: number
    loaders: LoadersType

    constructor(sources: ISource[]) {
        super()

        this.sources = sources

        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader?.load(source.path as string, file => {
                    this.sourceLoaded<GLTF>(source, file)
                })
            } else if (source.type === 'texture') {
                this.loaders.textureLoader?.load(source.path as string, file => {
                    this.sourceLoaded<THREE.Texture>(source, file)
                })
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader?.load(source.path as string[], file => {
                    this.sourceLoaded(source, file)
                })
            }
        }
    }

    sourceLoaded<T>(source: ISource, file: FileTypes<T>) {
        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}
