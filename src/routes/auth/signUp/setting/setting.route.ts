import { Router } from "express";
import { getSettingController, patchSettingController } from "../../../../features/auth/signUp/setting/setting.controller";
import asyncHandler from "express-async-handler";
import { authAccessTokenMiddleware } from "../../../../utils/jwt.middleware";

export const settingRouter = Router();
settingRouter.get("/", asyncHandler(authAccessTokenMiddleware), asyncHandler(getSettingController));
settingRouter.patch("/", asyncHandler(authAccessTokenMiddleware), asyncHandler(patchSettingController));
