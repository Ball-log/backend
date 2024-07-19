import { sign, refresh } from "../../../utils/jwt.utils";
import redisClient from "./../../../../config/db.redis";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { postLoginDao } from "../../../models/auth/login/login.dao";
import { JWT } from "../../../models/auth/login/login.dto";

export const getLoginService = async (req: string) => {
    const success = await postLoginDao(req);
    if (success) {
        const accessToken = sign(req);
        const refreshToken = refresh();
        redisClient.set(req, refreshToken);

        const body: BaseApiResponse<JWT> = {
            ...status.SUCCESS.body,
            result: {
                accessToken
            }
        };
        return [ body, refreshToken ];
    } else {
        throw new ApiError(status.LOGIN_INFO_UNMATCHED);
    }
};
