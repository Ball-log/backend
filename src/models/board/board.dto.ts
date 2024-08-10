export interface blogDto {

    type: "blog",
    title: string,
    body: string,
    thumbnailUrl: string,
    user_id: string

}

export interface MvpDto {

    type: "mvp",
    playerId: number,
    playerRecord: string,
    thumbnailUrl: string

}

export interface ImageDto {
    id: string, // 이미지 ID
    postId: string, // 관련된 게시글 ID
    url: string // 이미지 URL
}


export interface MatchInfoDto {
    homeTeamId: string,
    awayTeamId: string,
    matchDate: Date,
    homeTeamScore: string,
    awayTeamScore: string
}

export interface CommentDto {
    
    body: string, // 댓글 내용
    type: "blog" | "mvp"
}

export interface ReplyDto {

    commentId: string,
    body: string,
    type: "blog" | "mvp"
}

export interface LikeDto {
    postId: string // 게시글 id
}
