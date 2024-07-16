import { Router } from "express";
import { PostSignUpController } from "../../../features/user/signUp/signUp.controller";
import asyncHandler from "express-async-handler";

export const SignUpRouter = Router().post("/signUp", asyncHandler(PostSignUpController));
