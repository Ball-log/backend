import { Router } from "express";
import { loginRouter } from "./login/login.routes";
import { signUpRouter } from "./signUp/signUp.route";
export const UserRouter = Router();

UserRouter.use(loginRouter);
UserRouter.use(signUpRouter);
