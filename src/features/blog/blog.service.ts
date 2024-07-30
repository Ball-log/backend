import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import BlogDao from "../../models/blog/blog.dao";
import {
  getBlogPostsResDto,
  createBlogPostReqDto,
} from "../../models/blog/blog.dto";

const BlogService = {
  // 블로그 게시물 목록을 가져오는 함수
  getBlogPosts: async (page: number, cursor?: number) => {
    const result = await BlogDao.getBlogPosts(page, cursor);

    if (result) {
      const body: BaseApiResponse<getBlogPostsResDto> = {
        ...status.SUCCESS.body,
        result: {
          totalCount: result.totalCount,
          posts: result.posts,
        },
      };
      return body;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  // 새로운 블로그 게시물을 생성하는 함수
  createBlogPost: async (postData: createBlogPostReqDto) => {
    const result = await BlogDao.createBlogPost(postData);

    if (result) {
      const body: BaseApiResponse<{ postId: number }> = {
        ...status.SUCCESS.body,
        result: {
          postId: result.insertId,
        },
      };

      return body;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },
};

export default BlogService;
