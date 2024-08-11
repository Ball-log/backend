export interface blogDto {

    type: "blog",
    title: string,
    body: string,
    thumbnailUrl: string,
    user_id: string
}

export interface mvpDto {

    type: "mvp",
    playerId: number,
    playerRecord: string,
    thumbnailUrl: string
}

