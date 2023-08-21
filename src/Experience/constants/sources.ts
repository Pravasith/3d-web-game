export enum LOAD_ITEMS {
    'ENV_MAP_TEXTURE' = 'env_map_texture',
    'PLINI_MODEL' = 'plini_model',
    'TERRAIN' = 'terrain',
}

export interface ISource {
    name: LOAD_ITEMS
    type: 'cubeTexture' | 'gltfModel' | 'texture'
    path: string | string[]
}

const sources: ISource[] = [
    {
        name: LOAD_ITEMS.ENV_MAP_TEXTURE,
        type: 'cubeTexture',
        path: [
            'textures/environmentMap/neroi-front.png',
            'textures/environmentMap/neroi-back.png',
            'textures/environmentMap/neroi-up.png',
            'textures/environmentMap/neroi-down.png',
            'textures/environmentMap/neroi-right.png',
            'textures/environmentMap/neroi-left.png',
        ],
    },
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
    {
        name: LOAD_ITEMS.TERRAIN,
        type: 'gltfModel',
        path: 'models/terrain.gltf',
    },
]

export default sources
