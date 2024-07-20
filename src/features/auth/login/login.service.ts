import { login } from "../../../utils/jwt.utils";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { getLoginDao } from "../../../models/auth/login/login.dao";
import { JWT } from "../../../models/auth/login/login.dto";

export const getLoginService = async (req: string) => {
    const success = await getLoginDao(req);
    if (success) {

        const [ accessToken, refreshToken ] = await login(req);
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
