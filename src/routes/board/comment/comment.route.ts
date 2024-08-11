import { Router } from "express";
import asyncHandler from "express-async-handler";
import { commentController } from "../../../features/board/comment/comment.controller";

export const commentRouter = Router();
commentRouter.post("/", asyncHandler(commentController.post));
commentRouter.patch("/", asyncHandler(commentController.patch));
commentRouter.delete("/", asyncHandler(commentController.delete));