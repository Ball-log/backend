import { Router } from "express";
import asyncHandler from "express-async-handler";
import { loginRedirectRouter } from "./loginRedirect/loginRedirect.route";
import { loginGoogleController, loginKakaoController, loginNaverController } from "../../../features/auth/login/sns/sns.controller";

export const loginRouter = Router();
loginRouter.get("/google", asyncHandler(loginGoogleController));
loginRouter.get("/kakao", asyncHandler(loginKakaoController));
loginRouter.get("/naver", asyncHandler(loginNaverController));
loginRouter.use("/", asyncHandler(loginRedirectRouter));
