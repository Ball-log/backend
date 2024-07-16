import { Router } from "express";
import { LoginRouter } from "./login/login.routes";

export const UserRouter = Router();

UserRouter.use(LoginRouter);
