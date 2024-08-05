import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import BlogDao from "../../models/write/write.dao";
import {
  getPostsResDto,
  patchToggleLikeResDto,
  insertPostResDto,
} from "../../models/write/write.dto";

const BlogService = {
  getBlogPosts: async (page: number, cursor?: number) => {
    const result = await BlogDao.getBlogPosts(page, cursor);

    if (result) {
      const body: BaseApiResponse<getPostsResDto> = {
        ...status.SUCCESS.body,
        result: {
          totalCount: result.totalCount,
          data: result.posts,
        },
      };

      return body;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  insertBlogPost: async (
    title: string,
    content: string,
    userId: string,
    imageUrls: [string],
    matchDate?: string,
    teamA?: string,
    teamB?: string,
    matchResult?: string
  ) => {
    const postId = await BlogDao.insertBlogPost(title, content, userId);

    if (title === "" || content === "") {
      throw new ApiError(status.THERE_IS_NO_TITLE_OR_CONTENT_IN_POST);
    }

    if (!title || !content || !imageUrls) {
      throw new ApiError(status.WRONG_BODY);
    }

    if (postId) {
      const imageInsertPromises = imageUrls.map((url) => {
        return BlogDao.insertImageIntoBlogPost(url, postId.toString());
      });
      await Promise.all(imageInsertPromises);

      if (matchDate && teamA && teamB && matchResult) {
        await BlogDao.insertMatchResult(
          postId,
          matchDate,
          teamA,
          teamB,
          matchResult
        );
      }

      const response: BaseApiResponse<insertPostResDto> = {
        ...status.SUCCESS.body,
        result: {
          postId,
        },
      };

      return response;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  toggleLike: async (userId: string, postId: string) => {
    const currentState = await BlogDao.getUserLikeStatus(userId, postId);
    if (currentState) {
      await BlogDao.deleteLike(userId, postId);
      const body: BaseApiResponse<patchToggleLikeResDto> = {
        ...status.SUCCESS.body,
        result: {
          like: false,
        },
      };
      return body;
    } else {
      await BlogDao.insertLike(userId, postId);
      const body: BaseApiResponse<patchToggleLikeResDto> = {
        ...status.SUCCESS.body,
        result: {
          like: true,
        },
      };
      return body;
    }
  },

  postComment: async (userId: string, postId: string, body: string) => {
    await BlogDao.insertPostComment(userId, postId, body);
    const response: BaseApiResponse<emptyDto> = {
      ...status.SUCCESS.body,
      result: {},
    };
    return response;
  },

  postReply: async (
    userId: string,
    commentId: string,
    postId: string,
    body: string
  ) => {
    await BlogDao.insertPostReply(userId, commentId, postId, body);
    const response: BaseApiResponse<emptyDto> = {
      ...status.SUCCESS.body,
      result: {},
    };
    return response;
  },

  deleteBlogPost: async (userId: string, postId: string) => {
    let authorId = await BlogDao.getBlogPostAuthorId(postId);

    if (userId !== authorId) {
      throw new ApiError(status.ONLY_AUTHOR_CAN_DELETE_OR_EDIT);
    }

    await BlogDao.deleteBlogPost(postId);
    const response: BaseApiResponse<emptyDto> = {
      ...status.SUCCESS.body,
      result: {},
    };
    return response;
  },
};

export default BlogService;
