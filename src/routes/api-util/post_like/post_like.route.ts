import { Router } from "express";
import asyncHandler from "express-async-handler";
import { post_likeController } from "../../../features/api-utils/post_like/post_like.controller";

export const post_likeRouter = Router();
post_likeRouter.post("/", asyncHandler(post_likeController.post));