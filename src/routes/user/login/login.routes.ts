import { Router } from "express";
import { PostLoginContoller, GetLoginContoller } from "../../../features/user/login/login.contoller";
import asyncHandler from "express-async-handler";

export const LoginRouter = Router().post("/login", asyncHandler(PostLoginContoller));
LoginRouter.get("/login", asyncHandler(GetLoginContoller));
