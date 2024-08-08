import { Request, Response } from "express";
import { postRefreshTokenService } from "./refreshToken.service";
import { postRefreshTokenReqHeadersDto as reqHeaders } from "../../../models/auth/refreshToken/refreshToken.dto";

export const postRefreshTokenController = async (req: Request, res: Response) => {
    console.log(req.headers);
    const headers: reqHeaders = {
        accessToken: req.headers.authorization as string,
        refreshToken: req.headers.refreshtoken as string
    };
    const result = await postRefreshTokenService(headers);
    res.set("Authorization", `Bearer ${result}`);
    res.send("ok");
};
