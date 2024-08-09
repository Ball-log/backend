import { login } from "../../../utils/jwt.utils";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { getLoginDao } from "../../../models/auth/login/login.dao";


export const getLoginService = async (req: string) => {
    const success = await getLoginDao(req);
    if (success) {

        const [ accessToken, refreshToken ] = await login(req);
        return [ accessToken, refreshToken ];
    } else {
        throw new ApiError(status.LOGIN_INFO_UNMATCHED);
    }
};
