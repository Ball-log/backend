import { Request, Response } from "express";
import { postRefreshTokenService } from "./refreshToken.service";
import { postRefreshTokenReqHeadersDto as reqHeaders } from "../../../models/auth/refreshToken/refreshToken.dto";

export const postRefreshTokenController = async (req: Request, res: Response) => {
    const headers: reqHeaders = {
        accessToken: req.headers.Authorization as string,
        refreshToken: req.headers.refreshToken as string
    };
    const result = await postRefreshTokenService(headers);
    res.set("Authorization", `Bearer ${result}`);
    res.send("ok");
};
