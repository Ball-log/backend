import { Router } from "express";
import { getSignUpController } from "../../../../features/auth/signUp/signUp.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware, tokenNaverMiddleware } from "../../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const signUpRedirectRouter = Router();

signUpRedirectRouter.get("/google/token", asyncHandler(tokenGoogleMiddleware), asyncHandler(getSignUpController));
signUpRedirectRouter.get("/kakao/token", asyncHandler(tokenKakaoMiddleware), asyncHandler(getSignUpController));
signUpRedirectRouter.get("/naver/token", asyncHandler(tokenNaverMiddleware), asyncHandler(getSignUpController));
