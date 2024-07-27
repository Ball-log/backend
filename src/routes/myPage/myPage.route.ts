import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getMyPageController } from "../../features/myPage/myPage.controller";
import { backImgRouter } from "./backgroundImg/backgroundImg.route";

export const myPageRouter = Router();
myPageRouter.get("/", asyncHandler(getMyPageController));
myPageRouter.use("/backgroundImg", asyncHandler(backImgRouter));
