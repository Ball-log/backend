export interface blogDto {
    post_type: "blog",
    title: string,
    body: string,
    imgUrls: string[],
    match_id: number
}

export interface mvpDto {

    post_type: "mvp",
    playerId: number,
    playerRecord: string,
    imgUrls: string[],
    match_id: number
}

export interface getBlogDto {
    post_type: "blog",
    title: string,
    body: string,
    create_at: Date,
    updated_at: Date,
    author: string,
    user_id: string,
    match_id: number
    img_urls: string[],
    match_info: {
        match_date: Date,
        home_team_icon_flag: string,
        away_team_icon_flag: string,
        home_team_score: number,
        away_team_score: number
    },
    comment_list: {
        comment_id: string,
        comment_user_id: string,
        comment_user_name: string,
        comment_body: string,
        comment_date: Date
    }[],
    reply_list: {
        reply_id: string,
        reply_user_id: string,
        reply_user_name: string,
        reply_body: string,
        reply_date: Date,
        commented_id: string
    }[],
    like_count: number,
    has_liked: boolean
}



export interface getBlogDto_ {
    title: string,
    body: string,
    create_at: Date,
    updated_at: Date,
    author: string,
    user_id: string,
    match_id: number
}

export interface matchDto {
    match_date: Date,
    home_team_icon_flag: string,
    away_team_icon_flag: string,
    home_team_score: number,
    away_team_score: number
}

export interface Comment {
    comment_id: string,
    comment_user_id: string,
    comment_user_name: string,
    comment_body: string,
    comment_date: Date
}

export interface CommentList extends Iterable<Comment> {
    [index: number]: Comment,
    length: number,
    [Symbol.iterator](): Iterator<Comment>
}

export interface Reply {
    reply_id: string,
    reply_user_id: string,
    reply_user_name: string,
    reply_body: string,
    reply_date: Date,
    commented_id: string
}

export interface ReplyList extends Iterable<Reply> {
    [index: number]: Reply,
    length: number,
    [Symbol.iterator](): Iterator<Reply>
}






