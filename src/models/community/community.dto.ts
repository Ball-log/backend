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
