import { Router } from "express";
import { getLoginController } from "../../../features/auth/login/login.controller";
import { tokenGoogleMiddleware, tokenKakaoMiddleware } from "../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const loginRouter = Router();
loginRouter.get("/login/google", asyncHandler(tokenGoogleMiddleware), asyncHandler(getLoginController));
loginRouter.get("/login/kakao", asyncHandler(tokenKakaoMiddleware), asyncHandler(getLoginController));

