import { Router } from "express";
import { getSignUpController } from "../../../../features/auth/signUp/signUp.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware, tokenNaverMiddleware } from "../../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const redirectRouter = Router();

redirectRouter.get("/google/redirect", asyncHandler(tokenGoogleMiddleware), asyncHandler(getSignUpController));
redirectRouter.get("/kakao/redirect", asyncHandler(tokenKakaoMiddleware), asyncHandler(getSignUpController));
redirectRouter.get("/naver/redirect", asyncHandler(tokenNaverMiddleware), asyncHandler(getSignUpController));
