import { Router } from "express";
import asyncHandler from "express-async-handler";

import { postRouter } from "./post/post.route";


export const boardRouter = Router();

boardRouter.use("/post", asyncHandler(postRouter))
