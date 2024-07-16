import { req_signUp } from "../../../models/user/signUp/signUp.dto";
import { PostSignUpDao } from "../../../models/user/signUp/signUp.dao";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const PostSignUpService = async (req: req_signUp) => {
    const result = await PostSignUpDao(req);


    if (result === -1) {
        throw new ApiError(status.EMAIL_ALREADY_EXIST);
    } else {
        const body: BaseApiResponse<req_signUp> = {
            ...status.SUCCESS.body,
            result: {
                ...req
            }
        };
        return body;
    }

};
