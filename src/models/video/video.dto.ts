export interface postVideoDto {
    title: string,
    video_url: string
}

export interface getVideoDto {
    post_type: "video",
    post_id: number,
    title: string,
    video_url: string,
    create_at: Date,
    updated_at: Date,
    user_id: string,
    user_name: string,
    user_icon_url: string,
    like_count: number,
    has_liked: boolean,
    isMine: boolean,
    comment_count: number,
    comment_list: {
        comment_id: string,
        comment_user_id: string,
        comment_user_name: string,
        comment_user_icon_url: string,
        comment_body: string,
        comment_date: Date,
        comment_isMine: boolean
    }[],
    reply_list: {
        reply_id: string,
        reply_user_id: string,
        reply_user_name: string,
        reply_user_icon_url: string,
        reply_body: string,
        reply_date: Date,
        commented_id: string,
        reply_isMine: boolean
    }[]
}