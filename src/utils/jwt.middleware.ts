import { verify } from "./jwt.utils";
import { Request, Response, NextFunction } from "express";
import { status } from "../../config/response.status";

export const authAccessTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer ")[1]; // header에서 access token을 가져옵니다.
        const result = verify(token); // token을 검증합니다.
        if (result.ok) { // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
            next();
        } else { // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
            res.status(401).send(status.ACCESS_TOKEN_EXPIRED);
        }
    }
};
