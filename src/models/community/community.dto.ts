// getPosts
export interface getPostsResDto {
    totalCount: number,
    data: PostThumbnail[]
}

export interface patchCommunity {

    title: string,
    content: string,
    img_urls: string[]

}


export interface PostThumbnail {
    post_id: number,
    title: string,
    content: string,
    user_name: string,
    created_at: string,
    updated_at: string,
    like_count: number,
    comment_count: number,
    img_urls: [string]
}

// getPostDetail
export interface getPostDetailDto {
    post_type: "community",
    post_id: number,
    title: string,
    content: string,
    created_at: string,
    updated_at: string,
    user_id: string,
    user_name: string,
    user_icon_url: string,
    isMine: boolean,
    like_count: number,
    has_liked: boolean,
    img_urls: string[],
    comment_count: number,
    comment_list: PostComments[],
    reply_list: PostReplies[]
}

export interface PostComments {
    comment_id: string,
    comment_user_id: string,
    comment_user_name: string,
    comment_user_icon_url: string,
    comment_body: string,
    comment_date: Date,
    comment_isMine: boolean
}

export interface PostReplies {
    reply_id: string,
    reply_user_id: string,
    reply_user_name: string,
    reply_user_icon_url: string,
    reply_body: string,
    reply_date: Date,
    commented_id: string,
    reply_isMine: boolean
}

// toggle like
export interface patchToggleLikeResDto {
    like: boolean
}
