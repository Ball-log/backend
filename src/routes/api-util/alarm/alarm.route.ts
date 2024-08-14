import { Router } from "express";
import asyncHandler from "express-async-handler";
import { alarmController } from "../../../features/api-utils/alarm/alarm.controller";

export const alarmRouter = Router();
alarmRouter.get("/", asyncHandler(alarmController.get));
alarmRouter.delete("/", asyncHandler(alarmController.delete));