export interface commentPostDto {
    body: string,
    post_id: number,
    post_user_id: string,
    post_type: "blog" | "mvp" | "community"
}

export interface commentPatchDto {
    id: number,
    body: string
}

export interface commentDeleteDto {
    id: number
}
