import { Request, Response } from "express";
import BlogService from "./write.service";
import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

const BlogController = {
  // 게시물 목록 가져오기
  getBlogPostsController: async (req: Request, res: Response) => {
    const type = req.query.type as string;
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    const result = await BlogService.getBlogPosts(page, cursor);
    res.json(result);
  },

  // 게시물 생성하기
  postBlogPost: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.userId;
      const { title, body, imageUrls, matchDate, teamA, teamB, matchResult } =
        req.body;

      const result = await BlogService.insertBlogPost(
        title,
        body,
        userId,
        imageUrls,
        matchDate,
        teamA,
        teamB,
        matchResult
      );
      res.json(result);
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        res.json(err.data.body);
      } else {
        res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
      }
    }
  },

  // 좋아요 토글하기
  patchToggleLikeController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.userId;
      const postId = req.params.postId;
      const result = await BlogService.toggleLike(userId, postId);

      res.json(result);
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        res.json(err.data.body);
      } else {
        res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
      }
    }
  },

  // 댓글 달기
  postCommentController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.userId;
      const { postId, body } = req.body;

      if (!postId || !body) {
        throw new ApiError(status.THERE_IS_NO_POSTID_OR_BODY);
      }

      const result = await BlogService.postComment(userId, postId, body);
      res.json(result);
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        res.json(err.data.body);
      } else {
        res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
      }
    }
  },

  // 대댓글 달기
  postReplyController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.userId;
      const { postId, commentId, body } = req.body;

      if (!postId || !commentId || !body) {
        throw new ApiError(status.THERE_IS_NO_POSTID_OR_COMMENTID_OR_BODY);
      }

      const result = await BlogService.postReply(
        userId,
        commentId,
        postId,
        body
      );
      res.json(result);
    } catch (err) {
      console.log(err);

      if (err instanceof ApiError) {
        res.json(err.data.body);
      } else {
        res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
      }
    }
  },

  // 게시물 삭제하기
  deleteBlogPost: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.userId;
      const postId = req.params.postId;

      const result = await BlogService.deleteBlogPost(userId, postId);
      res.json(result);
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        res.json(err.data.body);
      } else {
        res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
      }
    }
  },
};

export default BlogController;
