import Router from "express";
import { matchInfoController } from "./../../../features/api-utils/matchInfo/matchInfo.controller"
import asyncHandler from "express-async-handler";

export const matchInfoRouter = Router();
matchInfoRouter.get("/", asyncHandler(matchInfoController.get));