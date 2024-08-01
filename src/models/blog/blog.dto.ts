export interface BlogPost {
  id: number;
  title: string;
  body: string;
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
  body: string;
  public: boolean;
  thumbnail_url: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
