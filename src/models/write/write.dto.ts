// 게시물 목록을 가져옴
export interface GetBlogPostsResDto {
  totalCount: number;
  posts: PostThumbnail[];
}

export interface PostThumbnail {
  postId: number;
  title: string;
  body: string;
  authorName: string;
  date: string;
  likeCount: number;
  commentCount: number;
  imageUrls: string[];
}

export interface getPostsResDto {
  totalCount: number;
  data: PostThumbnail[];
}

export interface PostComments {
  commentId: number;
  comment: string;
  authorId: string;
  authorName: string;
  authorProfileUrl: string;
  date: string;
  isMine: boolean;
  replies: PostReplies[];
}

export interface PostReplies {
  replyId: number;
  commentId: number;
  comment: string;
  authorId: string;
  authorName: string;
  authorProfileUrl: string;
  date: string;
  isMine: boolean;
}

export interface patchToggleLikeResDto {
  like: boolean;
}

export interface insertPostResDto {
  postId: number;
}

export interface InsertBlogPostDto {
  title: string;
  body: string;
  userId: string;
  imageUrls: [string];
  matchDate: string;
  teamA: string;
  teamB: string;
  matchResult: string;
}
