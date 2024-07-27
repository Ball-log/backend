// getPosts
export interface getPostsResDto {
  totalCount: number;
  data: PostThumbnail[];
}

export interface PostThumbnail {
  postId: number;
  title: string;
  content: string;
  authorName: string;
  date: string;
  likeCount: number;
  commentCount: number;
  imageUrls: [string];
}

// getPostDetail
export interface getPostDetailDto {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorProfileUrl: string;
  date: string;
  likeCount: number;
  commentCount: number;
  imageUrl: string[];
  isMine: boolean;
  comments: PostComments[];
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

// toggle like
export interface patchToggleLikeResDto {
  like: boolean;
}
