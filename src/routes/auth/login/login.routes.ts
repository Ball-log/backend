import { Router } from "express";
import asyncHandler from "express-async-handler";
import { loginRedirectRouter } from "./loginRedirect/loginRedirect.route";
import { loginGoogleController, loginKakaoController, loginNaverController, /*loginTestController*/ } from "../../../features/auth/login/sns/sns.controller";
import { loginTokenController } from "../../../features/auth/login/login.controller";

export const loginRouter = Router();
loginRouter.get("/google", asyncHandler(loginGoogleController));
loginRouter.get("/kakao", asyncHandler(loginKakaoController));
loginRouter.get("/naver", asyncHandler(loginNaverController));
loginRouter.post("/token", asyncHandler(loginTokenController.post));
loginRouter.get("/token", asyncHandler(loginTokenController.get));
//loginRouter.post("/test", asyncHandler(loginTestController));
loginRouter.use("/", asyncHandler(loginRedirectRouter));
