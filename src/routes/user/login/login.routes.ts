import { Router } from "express";
import { postLoginController, getLoginController } from "../../../features/user/login/login.controller";
import asyncHandler from "express-async-handler";

export const loginRouter = Router().post("/login", asyncHandler(postLoginController));
loginRouter.get("/login", asyncHandler(getLoginController));
