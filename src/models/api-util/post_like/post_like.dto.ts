export interface post_likeDto {
    post_id: number,
    post_user_id: string,
    checked: boolean,
    post_type: "blog" | "mvp" | "article"
}