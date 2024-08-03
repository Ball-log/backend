import { Router } from "express";
import { getSignUpController } from "../../../../features/auth/signUp/signUp.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware, tokenNaverMiddleware } from "../../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const signUpRedirectRouter = Router();

signUpRedirectRouter.get("/google/redirect", asyncHandler(tokenGoogleMiddleware), asyncHandler(getSignUpController));
signUpRedirectRouter.get("/kakao/redirect", asyncHandler(tokenKakaoMiddleware), asyncHandler(getSignUpController));
signUpRedirectRouter.get("/naver/redirect", asyncHandler(tokenNaverMiddleware), asyncHandler(getSignUpController));
