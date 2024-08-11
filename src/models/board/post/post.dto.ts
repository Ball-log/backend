export interface blogDto {
    type: "blog",
    title: string,
    body: string,
    imgUrls: string[]   
}

export interface mvpDto {

    type: "mvp",
    playerId: number,
    playerRecord: string,
    imgUrls: string[]
}

export interface imgSettingsDto {
    url: string,
    post_id: number,
    post_type: "article" | "blog" | "mvp"
}