import { login } from "../../../utils/jwt.utils";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { getLoginDao } from "../../../models/auth/login/login.dao";


export const getLoginService = async (user_id: string) => {
    const success = await getLoginDao(user_id);
    if (success) {
        const [ accessToken, refreshToken ] = await login(user_id);
        return [ accessToken, refreshToken ];
    } else {
        throw new ApiError(status.LOGIN_INFO_UNMATCHED);
    }
};
