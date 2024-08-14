import jwt, { JwtPayload } from "jsonwebtoken";
import redisClient from "./../../config/db.redis";
import { config } from "dotenv";
import { ApiError } from "../../config/error";
import { status } from "../../config/response.status";

config();

const secret: string = process.env.SECRET as string;
if (!secret) {

    throw new ApiError(status.JWT_SECRET_NOT_FOUND);
}

const sign = (user: string) => {
    // access token 발급
    const payload = {
        iss: "https://api.ballog.store",
        sub: user
    };
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "2h"
    });
};

const verify = (token: string) => {
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return {
            ok: true,
            sub: decoded.sub
        };
    } catch (err) {
        return {
            ok: false
        };
    }

};

const refresh = () => {

    return jwt.sign({}, secret, {
        algorithm: "HS256",
        expiresIn: "14d"
    });
};

const refreshVerify = async (token: string, userId: string) => {
    try {
        const data = await redisClient.get(userId);
        if (token === data) {
            try {
                jwt.verify(token, secret);
                return true;
            } catch (err) {
                throw new ApiError(status.JWT_VERIFICATIN_FAILED);
            }
        } else {
            return false;
        }
    } catch (err) {
        throw new ApiError(status.REDIS_ERROR);

    }
};

const login = async (user_id: string) => {
    const accessToken = sign(user_id);
    const refreshToken = refresh();
    await redisClient.set(user_id, refreshToken);
    return [ accessToken, refreshToken ];
};

export { login, sign, verify, refresh, refreshVerify };
