import Router from "express";
import { postS3PresignedUrlController } from "../../../api-util/s3/s3.contoller";
import asyncHandler from "express-async-handler";

export const s3Router = Router();
s3Router.post("/", asyncHandler(postS3PresignedUrlController));
