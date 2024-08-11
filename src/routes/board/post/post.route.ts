import { Router } from "express";
import asyncHandler from "express-async-handler";
import { postController } from "../../../features/board/post/post.controller";

export const postRouter = Router();
postRouter.post("/", asyncHandler(postController.post));
postRouter.patch("/:post_id", asyncHandler(postController.patch));
postRouter.delete("/:post_id", asyncHandler(postController.delete));