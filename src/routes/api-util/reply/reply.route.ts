import { Router } from "express";
import asyncHandler from "express-async-handler";
import { replyController } from "../../../features/api-utils/reply/reply.controller";

export const replyRouter = Router();
replyRouter.post("/", asyncHandler(replyController.post));
replyRouter.patch("/", asyncHandler(replyController.patch));
replyRouter.delete("/", asyncHandler(replyController.delete));