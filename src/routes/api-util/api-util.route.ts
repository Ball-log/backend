import Router from "express";
import { s3Router } from "./s3/s3.route";
import asyncHandler from "express-async-handler";

export const api_utilsRouter = Router();
api_utilsRouter.use("/s3", asyncHandler(s3Router));
