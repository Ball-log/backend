import { Router } from "express";
import { LoginRouter } from "./login/login.routes";
import { SignUpRouter } from "./signUp/signUp.route";
export const UserRouter = Router();

UserRouter.use(LoginRouter);
UserRouter.use(SignUpRouter);
