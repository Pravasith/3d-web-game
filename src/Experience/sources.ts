export enum LOAD_ITEMS {
    'ENV_MAP_TEXTURE' = 'env_map_texture',
    'PLINI_MODEL' = 'plini_model',
}

export interface ISource {
    name: LOAD_ITEMS
    type: 'cubeTexture' | 'gltfModel' | 'texture'
    path: string | string[]
}

const sources: ISource[] = [
    // {
    //     name: LOAD_ITEMS.ENV_MAP_TEXTURE,
    //     type: 'cubeTexture',
    //     path: [
    //         'textures/environmentMap/px.jpg',
    //         'textures/environmentMap/nx.jpg',
    //         'textures/environmentMap/py.jpg',
    //         'textures/environmentMap/ny.jpg',
    //         'textures/environmentMap/pz.jpg',
    //         'textures/environmentMap/nz.jpg',
    //     ],
    // },
    // {
    //     name: 'grassColorTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/color.jpg',
    // },
    // {
    //     name: 'grassNormalTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/normal.jpg',
    // },
    {
        name: LOAD_ITEMS.PLINI_MODEL,
        type: 'gltfModel',
        path: 'models/plini.gltf',
    },
]

export default sources
