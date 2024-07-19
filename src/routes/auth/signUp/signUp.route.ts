import { Router } from "express";
import { getSignUpController } from "../../../features/auth/signUp/signUp.controller";
import { tokenGoogleMiddleware } from "../../../utils/jwt.middleware";
import asyncHandler from "express-async-handler";

export const signUpRouter = Router();
signUpRouter.get("/signUp", asyncHandler(tokenGoogleMiddleware), asyncHandler(getSignUpController));
