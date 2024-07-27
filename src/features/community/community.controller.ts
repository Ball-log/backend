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
      const userId = res.locals.userId;
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
      return;
    }
  },
};

export default CommunityController;
