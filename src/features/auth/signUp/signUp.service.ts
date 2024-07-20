import { postSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";
import { postSignUpDao } from "../../../models/auth/signUp/signUp.dao";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { login } from "../../../utils/jwt.utils";
import { JWT } from "../../../models/auth/login/login.dto";

export const getSignUpService = async (locals: postSignUpLocalsDto) => {

    const result = await postSignUpDao(locals);
    if (result === -1) {
        throw new ApiError(status.EMAIL_ALREADY_EXIST);
    } else {
        const [ accessToken, refreshToken ] = await login(locals.id);
        const body: BaseApiResponse<postSignUpLocalsDto & JWT> = {
            ...status.SUCCESS.body,
            result: {
                ...locals,
                accessToken
            }
        };
        return [ body, refreshToken ];
    }
};
