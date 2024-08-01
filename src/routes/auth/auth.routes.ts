import { Router } from "express";
import { refreshTokenRouter } from "./refreshToken/refreshToken.routes";
import { loginRouter } from "./login/login.routes";
import { signUpRouter } from "./signUp/signUp.route";
import asyncHandler from "express-async-handler";
export const authRouter = Router();

authRouter.use(refreshTokenRouter);
authRouter.use(loginRouter);
authRouter.use("/signUp", asyncHandler(signUpRouter));

