import { verify } from "./jwt.utils";
import { Request, Response, NextFunction } from "express";
import { status } from "../../config/response.status";

export const authAccessTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const accessToken = req.headers.accesstoken as string;
        const token = accessToken.split(" ")[1];
        const result = verify(token); // token을 검증합니다.

        // param 혹은 다양한 걸 통해 email과 토큰이 매치되는지를 판단
        if (result.ok) {
            next();
        } else {
            res.status(401).send(status.ACCESS_TOKEN_EXPIRED.body);
        }
    }
};
