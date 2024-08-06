import { Request, Response } from "express";
import CommunityService from "./community.service";
import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

const CommunityController = {
  getPostsController: async (req: Request, res: Response) => {
    const type = req.query.type as string;
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;
    const page = req.query.page ? parseInt(req.query.page as string) : 15;

    if (!type) {
      res.json(new ApiError(status.POST_TYPE_EMPTY).data.body);
      return;

      // throw new ApiError(status.POST_TYPE_EMPTY);
    }
    const result = await CommunityService.getPosts(type, page, cursor);
    res.json(result);
  },

  getPostDetailController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const postId = req.params.postId;
      const result = await CommunityService.getPostDetail(userId, postId);

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
  postPost: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const title = req.body.title;
      const content = req.body.content;
      const imageUrls = req.body.imageUrls;
      const type = req.body.type;

      const result = await CommunityService.insertPost(
        title,
        content,
        userId,
        imageUrls,
        type
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
  patchToggleLikeController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const postId = req.params.postId;
      const result = await CommunityService.toggleLike(userId, postId);

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
  postCommentController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const { postId, body } = req.body;

      if (!postId || !body) {
        throw new ApiError(status.THERE_IS_NO_POSTID_OR_BODY);
      }

      const result = await CommunityService.postComment(userId, postId, body);
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
  postReplyController: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const { postId, commentId, body } = req.body;

      if (!postId || !commentId || !body) {
        throw new ApiError(status.THERE_IS_NO_POSTID_OR_COMMENTID_OR_BODY);
      }

      const result = await CommunityService.postReply(
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
  deletePost: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const postId = req.params.postId;

      const result = await CommunityService.deletePost(userId, postId);

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
  updatePost: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const postId = req.params.postId;
      const title = req.body.title;
      const content = req.body.content;
      const deleteImageIds = req.body.deleteImageIds;
      const newImageUrls = req.body.newImageUrls;

      const result = await CommunityService.updatePost(
        userId,
        postId,
        title,
        content,
        deleteImageIds,
        newImageUrls
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
};

export default CommunityController;
