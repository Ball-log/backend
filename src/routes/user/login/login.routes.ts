import { Router } from "express";
import { postLoginContoller, getLoginContoller } from "../../../features/user/login/login.contoller";
import asyncHandler from "express-async-handler";

export const loginRouter = Router().post("/login", asyncHandler(postLoginContoller));
loginRouter.get("/login", asyncHandler(getLoginContoller));
