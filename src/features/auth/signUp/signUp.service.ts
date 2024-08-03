import { getSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";
import { getSignUpDao } from "../../../models/auth/signUp/signUp.dao";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { login } from "../../../utils/jwt.utils";


export const getSignUpService = async (locals: getSignUpLocalsDto) => {

    const result = await getSignUpDao(locals);
    if (result === -1) {
        throw new ApiError(status.EMAIL_ALREADY_EXIST);
    } else {
        const [ accessToken, refreshToken ] = await login(locals.id);
        return [ accessToken, refreshToken ];
    }
};
