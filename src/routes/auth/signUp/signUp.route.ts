import { Router } from "express";
import { getSignUpController } from "../../../features/auth/signUp/signUp.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware, tokenNaverMiddleware } from "../../../utils/jwt.middleware";
import { settingRouter } from "./setting/setting.route";
import asyncHandler from "express-async-handler";

export const signUpRouter = Router();
signUpRouter.get("/signUp/google", asyncHandler(tokenGoogleMiddleware), asyncHandler(getSignUpController));
signUpRouter.get("/signUp/kakao", asyncHandler(tokenKakaoMiddleware), asyncHandler(getSignUpController));
signUpRouter.get("/signUp/naver", asyncHandler(tokenNaverMiddleware), asyncHandler(getSignUpController));
signUpRouter.use("/signUp/setting", asyncHandler(settingRouter));
