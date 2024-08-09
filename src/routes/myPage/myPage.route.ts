import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getMyPageController } from "../../features/myPage/myPage.controller";
import { backImgRouter } from "./backgroundImg/backgroundImg.route";
import { postRouter } from "./post/post.route";
import { teamSetRouter } from "./teamSetting/teamSetting.route";

export const myPageRouter = Router();
myPageRouter.get("/", asyncHandler(getMyPageController));
myPageRouter.use("/setting/backgroundImg", asyncHandler(backImgRouter));
myPageRouter.use("/post", asyncHandler(postRouter));
myPageRouter.use("/setting/teamSetting", asyncHandler(teamSetRouter));
