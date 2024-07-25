import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getPostsController } from "../../features/community/community.controller";

export const communityRouter = Router();
communityRouter.get("/posts", asyncHandler(getPostsController));
