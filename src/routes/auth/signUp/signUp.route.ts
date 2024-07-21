import { Router } from "express";
import { getSignUpController } from "../../../features/auth/signUp/signUp.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware } from "../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const signUpRouter = Router();
signUpRouter.get("/signUp/google", asyncHandler(tokenGoogleMiddleware), asyncHandler(getSignUpController));
signUpRouter.get("/signUp/kakao", asyncHandler(tokenKakaoMiddleware), asyncHandler(getSignUpController));
