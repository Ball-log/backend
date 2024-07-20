import { Router } from "express";
import { postRefreshTokenController } from "./../../../features/auth/refreshToken/refreshToken.controller";
import asyncHandler from "express-async-handler";

export const refreshTokenRouter = Router().post("/refreshToken", asyncHandler(postRefreshTokenController));
