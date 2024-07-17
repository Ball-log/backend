import { Router } from "express";
import { postSignUpController } from "../../../features/user/signUp/signUp.controller";
import asyncHandler from "express-async-handler";

export const signUpRouter = Router().post("/signUp", asyncHandler(postSignUpController));
