export interface post_likeDto {
    post_id: number,
    checked: boolean,
    type: "blog" | "mvp" | "article"
}