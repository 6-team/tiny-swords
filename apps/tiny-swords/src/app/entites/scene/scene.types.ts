export type SceneConfig = {
    tileSize: number;
    scale: number;
}

export interface ITile {
    getData(): Promise<{
        image: HTMLImageElement,
        coords: [number, number],
        size: number;
    }>
}