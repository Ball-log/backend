import { sign, refresh } from "../../../utils/jwt.utils";
import redisClient from "./../../../../config/db.redis";
import { postLoginReqDto, JWT } from "../../../models/user/login/login.dto";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { postLoginDao } from "../../../models/user/login/login.dao";

export const postLoginService = async (req: postLoginReqDto) => {
    const success = await postLoginDao(req);
    if (success) {
        const accessToken = sign(req);
        const refreshToken = refresh();
        redisClient.set(req.email, refreshToken);

        const body: BaseApiResponse<JWT> = {
            ...status.SUCCESS.body,
            result: {
                accessToken,
                refreshToken
            }
        };
        return body;
    } else {
        throw new ApiError(status.PASSWORD_UNMATCHED);
    }
};

export const getLoginService = async (req: postLoginReqDto) => {
    console.log(req);
    return "test";
};
