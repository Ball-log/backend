export interface blogDto {
    post_type: "blog",
    title: string,
    body: string,
    img_urls: string[],
    match_id: number
}

export interface mvpDto {

    post_type: "mvp",
    player_id: number,
    player_record: string,
    img_urls: string[],
    match_id: number
}

export interface getBlogDto {
    post_type: "blog",
    post_id: number,
    title: string,
    body: string,
    create_at: string,
    updated_at: string,
    user_id: string,
    user_name: string,
    user_icon_url: string,
    match_id: number,
    img_urls: string[],
    like_count: number,
    has_liked: boolean,
    isMine: boolean,
    comment_count: number,
    match_info: {
        match_date: string,
        home_team_icon_flag: string,
        away_team_icon_flag: string,
        home_team_score: number,
        away_team_score: number
    },
    comment_list: {
        comment_id: string,
        comment_user_id: string,
        comment_user_name: string,
        comment_user_icon_url: string,
        comment_body: string,
        comment_date: string,
        comment_isMine: boolean
    }[],
    reply_list: {
        reply_id: string,
        reply_user_id: string,
        reply_user_name: string,
        reply_user_icon_url: string,
        reply_body: string,
        reply_date: string,
        commented_id: string,
        reply_isMine: boolean
    }[]
}

export interface getMvpDto {
    post_type: "mvp",
    post_id: number,
    player_id: number,
    player_name: string,
    player_record: string,
    create_at: string,
    updated_at: string,
    user_id: string,
    user_name: string,
    user_icon_url: string,
    match_id: number,
    img_urls: string[],
    like_count: number,
    has_liked: boolean,
    isMine: boolean,
    comment_count: number,
    match_info: {
        match_date: string,
        home_team_icon_flag: string,
        away_team_icon_flag: string,
        home_team_score: number,
        away_team_score: number
    },
    comment_list: {
        comment_id: string,
        comment_user_id: string,
        comment_user_name: string,
        comment_user_icon_url: string,
        comment_body: string,
        comment_date: string,
        comment_isMine: boolean
    }[],
    reply_list: {
        reply_id: string,
        reply_user_id: string,
        reply_user_name: string,
        reply_user_icon_url: string,
        reply_body: string,
        reply_date: string,
        commented_id: string,
        reply_isMine: boolean
    }[]
}

export interface getBlogDto_ {
    post_type: "blog",
    post_id: number,
    title: string,
    body: string,
    create_at: string,
    updated_at: string,
    user_id: string,
    user_name: string,
    user_icon_url: string,
    match_id: number,
    img_urls: string[],
    like_count: number,
    has_liked: boolean,
    isMine: boolean,
    comment_count: number
}

export interface getMvpDto_ {
    post_type: "mvp",
    post_id: number,
    player_id: number,
    player_name: string,
    player_record: string,
    create_at: string,
    updated_at: string,
    user_id: string,
    user_name: string,
    user_icon_url: string,
    match_id: number,
    img_urls: string[],
    like_count: number,
    has_liked: boolean,
    isMine: boolean,
    comment_count: number
}

export interface matchDto {
    match_date: string,
    home_team_icon_flag: string,
    away_team_icon_flag: string,
    home_team_score: number,
    away_team_score: number
}

export interface Comment {
    comment_id: string,
    comment_user_id: string,
    comment_user_name: string,
    comment_user_icon_url: string,
    comment_body: string,
    comment_date: string,
    comment_isMine: boolean
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
    reply_user_icon_url: string,
    reply_body: string,
    reply_date: string,
    commented_id: string,
    reply_isMine: boolean
}

export interface ReplyList extends Iterable<Reply> {
    [index: number]: Reply,
    length: number,
    [Symbol.iterator](): Iterator<Reply>
}


