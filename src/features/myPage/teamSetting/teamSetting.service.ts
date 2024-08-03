import { getTeamSetDao, patchTeamSetDao } from "../../../models/myPage/teamSetting/teamSetting.dao";
import { getTeamSetReqDto, patchTeamSetDto } from "../../../models/myPage/teamSetting/teamSetting.dto";
import { status } from "../../../../config/response.status";
import { BaseApiResponse } from "../../../../config/response";
import { RowDataPacket } from "mysql2";
import { ApiError } from "../../../../config/error";

export const getTeamSetService = async () => {
    const result: getTeamSetReqDto = await getTeamSetDao() as RowDataPacket[] as getTeamSetReqDto;

    const body: BaseApiResponse<getTeamSetReqDto> = {
        ...status.SUCCESS.body,
        result: result
    };
    return body;
};

export const patchTeamSetService = async (userId: string, req: patchTeamSetDto) => {
    if (typeof req.team_id !== "number") {
        throw new ApiError(status.REQUEST_BODY_INVALID);
    }
    const result: number = await patchTeamSetDao(req.team_id, userId);
    if (result === 1) {
        const body: BaseApiResponse<patchTeamSetDto> = {
            ...status.SUCCESS.body,
            result: req
        };
        return body;
    } else {
        throw new ApiError(status.REQUEST_BODY_INVALID);
    }
};
