import { Router } from "express";
import { settingRouter } from "./setting/setting.route";
import asyncHandler from "express-async-handler";
import { redirectRouter } from "./redirect/redirect.route";
import { signUpGoogleController, signUpKakaoController, signUpNaverController } from "../../../features/auth/signUp/sns/sns.controller";

export const signUpRouter = Router();

signUpRouter.get("/google", asyncHandler(signUpGoogleController));
signUpRouter.get("/kakao", asyncHandler(signUpKakaoController));
signUpRouter.get("/naver", asyncHandler(signUpNaverController));
signUpRouter.use("/setting", asyncHandler(settingRouter));
signUpRouter.use("/", asyncHandler(redirectRouter));
