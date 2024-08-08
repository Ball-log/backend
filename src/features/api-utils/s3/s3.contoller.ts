import { Request, Response } from "express";
import { postS3PresignedUrlService as postS3PresignedUrlService } from "./s3.service";

export const postS3PresignedUrlController = async (req: Request, res: Response) => {
    const result = await postS3PresignedUrlService(req.body);
    res.json(result);
};
