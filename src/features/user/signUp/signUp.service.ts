import { postSignUpReqDto } from "../../../models/user/signUp/signUp.dto";
import { postSignUpDao } from "../../../models/user/signUp/signUp.dao";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const postSignUpService = async (req: postSignUpReqDto) => {
    const result = await postSignUpDao(req);


    if (result === -1) {
        throw new ApiError(status.EMAIL_ALREADY_EXIST);
    } else {
        const body: BaseApiResponse<postSignUpReqDto> = {
            ...status.SUCCESS.body,
            result: {
                ...req
            }
        };
        return body;
    }

};
