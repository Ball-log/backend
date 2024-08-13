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

communityRouter.post("/post", asyncHandler(CommunityController.postPost));


communityRouter.delete(
    "/post/:postId",
    asyncHandler(CommunityController.deletePost)
);

communityRouter.patch(
    "/post/:postId",
    asyncHandler(CommunityController.updatePost)
);
