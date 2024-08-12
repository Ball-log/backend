export interface commentPostDto {
    body: string,
    post_id: number,
    type: "blog" | "mvp"
}

export interface commentPatchDto {
    id: number,
    body: string
}

export interface commentDeleteDto {
    id: number
}
