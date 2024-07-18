import { Router } from "express";
import { refreshTokenRouter } from "./refreshToken/refreshToken.routes";

export const authRouter = Router();

authRouter.use(refreshTokenRouter);

