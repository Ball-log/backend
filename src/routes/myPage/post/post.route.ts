import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getPostController } from "../../../features/myPage/post/post.controller";
export const postRouter = Router();
postRouter.get("/", asyncHandler(getPostController));
