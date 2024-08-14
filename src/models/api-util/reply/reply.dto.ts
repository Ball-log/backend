export interface replyPostDto {
    body: string,
    post_id: number,
    post_user_id: string,
    comment_id: number,
    post_type: "blog" | "mvp" | "community"
}

export interface replyPatchDto {
    id: number,
    body: string
}

export interface replyDeleteDto {
    id: number
}
