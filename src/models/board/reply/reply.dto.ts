export interface replyPostDto {
    body: string,
    post_id: number,
    comment_id: number,
    type: "blog" | "mvp"
}

export interface replyPatchDto {
    id: number,
    body: string
}

export interface replyDeleteDto {
    id: number
}
