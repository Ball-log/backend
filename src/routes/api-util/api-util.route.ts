import Router from "express";
import { s3Router } from "./s3/s3.route";
import asyncHandler from "express-async-handler";
import { matchInfoRouter } from "./matchInfo/matchInfo.route";
import { commentRouter } from "../api-util/comment/comment.route";
import { post_likeRouter } from "../api-util/post_like/post_like.route";
import { replyRouter } from "../api-util/reply/reply.route";

export const api_utilsRouter = Router();
api_utilsRouter.use("/s3", asyncHandler(s3Router));
api_utilsRouter.use("/matchInfo", asyncHandler(matchInfoRouter));
api_utilsRouter.use("/comment", asyncHandler(commentRouter))
api_utilsRouter.use("/post_like", asyncHandler(post_likeRouter))
api_utilsRouter.use("/reply", asyncHandler(replyRouter))