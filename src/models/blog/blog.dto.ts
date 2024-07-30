export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createAt: Date;
  updatedAt: Date;
}

export interface getBlogPostsResDto {
  totalCount: number;
  posts: BlogPost[];
}

export interface createBlogPostReqDto {
  title: string;
  content: string;
  author: string;
}
