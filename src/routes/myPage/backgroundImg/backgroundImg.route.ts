import { Router } from "express";
import asyncHandler from "express-async-handler";
import { patchBackImgController } from "../../../features/myPage/backgroundImg/backgroundImg.contoller";

export const backImgRouter = Router();
backImgRouter.patch("/", asyncHandler(patchBackImgController));
