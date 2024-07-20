import { Router } from "express";
import { refreshTokenRouter } from "./refreshToken/refreshToken.routes";
import { loginRouter } from "./login/login.routes";
import { signUpRouter } from "./signUp/signUp.route";

export const authRouter = Router();

authRouter.use(refreshTokenRouter);
authRouter.use(loginRouter);
authRouter.use(signUpRouter);

