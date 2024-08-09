import express from "express";
import { healthController } from "./health.controller";

export const healthRoute = express.Router();

healthRoute.get('/', healthController)