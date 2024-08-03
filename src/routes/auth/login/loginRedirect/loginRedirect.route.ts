import { Router } from "express";
import { getLoginController } from "../../../../features/auth/login/login.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware, tokenNaverMiddleware } from "../../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const loginRedirectRouter = Router();

loginRedirectRouter.get("/google/redirect", asyncHandler(tokenGoogleMiddleware), asyncHandler(getLoginController));
loginRedirectRouter.get("/kakao/redirect", asyncHandler(tokenKakaoMiddleware), asyncHandler(getLoginController));
loginRedirectRouter.get("/naver/redirect", asyncHandler(tokenNaverMiddleware), asyncHandler(getLoginController));
