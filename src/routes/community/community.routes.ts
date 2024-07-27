import { Router } from "express";
import asyncHandler from "express-async-handler";
import CommunityController from "../../features/community/community.controller";

export const communityRouter = Router();
communityRouter.get(
  "/posts",
  asyncHandler(CommunityController.getPostsController)
);

communityRouter.get(
  "/post/:postId",
  asyncHandler(CommunityController.getPostDetailController)
);

communityRouter.patch(
  "/like/:postId",
  asyncHandler(CommunityController.patchToggleLikeController)
);

communityRouter.post(
  "/comment",
  asyncHandler(CommunityController.postCommentController)
);

communityRouter.post(
  "/reply",
  asyncHandler(CommunityController.postReplyController)
);
