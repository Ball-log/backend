import express from "express";
import { healthController } from "../../features/health/health.controller";

export const healthRoute = express.Router();

healthRoute.get("/", healthController);
