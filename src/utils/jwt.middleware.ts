import { verify } from "./jwt.utils";
import { Request, Response, NextFunction } from "express";
import { status } from "../../config/response.status";
import { config } from "dotenv";
import axios from "axios";

config();

export const authAccessTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const accessToken = req.headers.accesstoken as string;
        const token = accessToken.split(" ")[1];
        const result = verify(token); // token을 검증합니다.

        if (result.ok) {
            next();
        } else {
            res.status(401).send(status.ACCESS_TOKEN_EXPIRED.body);
        }
    }
};


export const tokenGoogleMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    const path  = req.path;
    let redirectUri = null;
    if (path === "/signUp/google") {
        redirectUri = process.env.GOOGLE_REDIRECT_URI_SIGN_UP;
    } else {
        redirectUri = process.env.GOOGLE_REDIRECT_URI_LOGIN;
    }
    const { code } = req.query;
    const token = await axios.post(process.env.GOOGLE_TOKEN_URL as string, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    });
    const userInfo = await axios.get(process.env.GOOGLE_USERINFO_URL as string, {

        headers: {
            Authorization: "Bearer " + token.data.access_token
        }
    });
    res.locals = {
        id: "google" + userInfo.data.id,
        email: userInfo.data.email,
        name: userInfo.data.name
    };
    next();
};


export const tokenKakaoMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { code } = req.query;
    const data = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID as string,
        code: code as string
    };

    const queryString = `grant_type=${data.grant_type}&client_id=${data.client_id}&code=${data.code}`;


    const kakaoToken
    = (await axios.post(process.env.KAKAO_TOKEN_URL as string, queryString));


    const header = {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + kakaoToken.data.access_token
    };

    const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", { headers: header });

    res.locals = {
        id: "kakao" + userInfo.data.id,
        email: userInfo.data.kakao_account.email,
        name: "test"
    };
    next();
};
