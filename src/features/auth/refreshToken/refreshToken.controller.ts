import { Request, Response } from "express";
import { postRefreshTokenService } from "./refreshToken.service";
import { postRefreshTokenReqHeadersDto as reqHeaders } from "../../../models/auth/refreshToken/refreshToken.dto";

export const postRefreshTokenController = async (req: Request, res: Response) => {
    const headers: reqHeaders = {
        accessToken: req.headers.accesstoken as string,
        refreshToken: req.headers.refreshtoken as string
    };
    const result = await postRefreshTokenService(req.body, headers);
    res.send(result);
};
