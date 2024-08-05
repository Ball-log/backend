import { BaseApiResponse } from "../../../../config/response";
import { patchBackImgDao } from "../../../models/myPage/backgroundImg/backgroundImg.dao";
import { patchBackImgDto } from "../../../models/myPage/backgroundImg/backgroundImg.dto";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const patchBackImgService = async (userId: string, req: patchBackImgDto) => {
    if (typeof req.user_background_img !== "string") {
        throw new ApiError(status.REQUEST_BODY_INVALID);
    }
    const result = await patchBackImgDao(userId, req.user_background_img);
    if (result === 1) {
        const body: BaseApiResponse<patchBackImgDto> = {
            ...status.SUCCESS.body,
            result: req
        };
        return body;
    } else {
        throw new ApiError(status.REQUEST_BODY_INVALID);
    }
};
