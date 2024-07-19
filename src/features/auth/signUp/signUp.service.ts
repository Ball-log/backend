import { postSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";
import { postSignUpDao } from "../../../models/auth/signUp/signUp.dao";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const getSignUpService = async (locals: postSignUpLocalsDto) => {

    const result = await postSignUpDao(locals);
    if (result === -1) {
        throw new ApiError(status.EMAIL_ALREADY_EXIST);
    } else {
        const body: BaseApiResponse<postSignUpLocalsDto> = {
            ...status.SUCCESS.body,
            result: {
                ...locals
            }
        };
        return body;
    }
};
