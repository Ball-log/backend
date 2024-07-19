import { Router } from "express";
import { getLoginController } from "../../../features/auth/login/login.controller";
import { tokenGoogleMiddleware } from "../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const loginRouter = Router();
loginRouter.get("/login", asyncHandler(tokenGoogleMiddleware), asyncHandler(getLoginController));
