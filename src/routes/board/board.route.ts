import { Router } from "express";
import asyncHandler from "express-async-handler";
import { commentRouter } from "../api-util/comment/comment.route";
import { postRouter } from "./post/post.route";
import { post_likeRouter } from "../api-util/post_like/post_like.route";
import { replyRouter } from "../api-util/reply/reply.route";

export const boardRouter = Router();
boardRouter.use("/comment", asyncHandler(commentRouter))
boardRouter.use("/post", asyncHandler(postRouter))
boardRouter.use("/post_like", asyncHandler(post_likeRouter))
boardRouter.use("/reply", asyncHandler(replyRouter))