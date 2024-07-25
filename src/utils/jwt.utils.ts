import jwt, { JwtPayload } from "jsonwebtoken";
import redisClient from "./../../config/db.redis";
import { config } from "dotenv";

config();

const secret: string | undefined = process.env.SECRET;
if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
}

const sign = (user: string) => {
    // access token 발급
    const payload = {
        iss: "https://www.ballog.com",
        sub: user
    };

    return jwt.sign(payload, secret, {

        // secret으로 sign하여 발급하고 return
        algorithm: "HS256", // 암호화 알고리즘
        expiresIn: "1d" // 유효기간
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
        if (err instanceof Error) {
            return {
                ok: false,
                message: err.message
            };
        } else {
            throw new Error("Unknown error occurred");
        }
    }
};

const refresh = () => {
    // refresh token 발급
    return jwt.sign({}, secret, {

        // refresh token은 payload 없이 발급
        algorithm: "HS256",
        expiresIn: "14d"
    });
};

const refreshVerify = async (token: string, userId: string) => {
    try {
        const data = await redisClient.get(userId);
        if (token === data) {
            try {
                // JWT 토큰 검증
                jwt.verify(token, secret);
                return true;
            } catch (err) {
                console.error("JWT verification failed:", err);
                return false;
            }
        } else {
            return false; // 토큰이 Redis에 저장된 값과 일치하지 않을 경우
        }
    } catch (err) {
        console.error("Error retrieving data from Redis:", err);
        return false; // Redis에서 데이터를 가져오지 못한 경우
    }
};

const login = async (req: string) => {
    const accessToken = sign(req);
    const refreshToken = refresh();
    redisClient.set(req, refreshToken);
    return [ accessToken, refreshToken ];
};

export { login, sign, verify, refresh, refreshVerify };
