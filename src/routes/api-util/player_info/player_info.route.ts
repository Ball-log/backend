import Router from "express";
import { player_infoController } from "../../../features/api-utils/player_info/player_info.controller"
import asyncHandler from "express-async-handler";

export const player_infoRouter = Router();
player_infoRouter.get("/:match_id", asyncHandler(player_infoController.get));