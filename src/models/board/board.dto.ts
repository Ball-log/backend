export interface PostDto {
  id: string;
  title: string;
  body: string;
  publicStatus: boolean;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ImageDto {
  id: string; // 이미지 ID
  postId: string; // 관련된 게시글 ID
  url: string; // 이미지 URL
}

export interface MvpDto {
  id: string; // MVP 게시글 ID
  title: string; // 제목
  playerId: number; // 선수 이미지 URL
  playerRecord: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string; // 작성자 ID
}

export interface MatchInfoDto {
  homeTeamId: string;
  awayTeamId: string;
  matchDate: Date;
  homeTeamScore: string;
  awayTeamScore: string;
}

export interface CommentDto {
  postId: string; // 게시글 id
  userId: string; // 작성자 id
  body: string; // 댓글 내용
  postType: "blog" | "mvp";
}

export interface ReplyDto {
  postId: string;
  userId: string;
  commentId: string;
  body: string;
  postType: "blog" | "mvp";
}

export interface LikeDto {
  userId: string; // 사용자 id
  postId: string; // 게시글 id
}
