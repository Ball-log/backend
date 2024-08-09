import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getTeamSetController, patchTeamSetController } from "../../../features/myPage/teamSetting/teamSetting.controller";

export const teamSetRouter = Router();

teamSetRouter.get("/", asyncHandler(getTeamSetController));
teamSetRouter.patch("/", asyncHandler(patchTeamSetController));
