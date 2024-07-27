import { BaseApiResponse } from "../../../../../config/response";
import { getSettingDao, patchSettingDao } from "../../../../models/auth/signUp/setting/setting.dao";
import { getSettingResDto, patchSettingDto } from "../../../../models/auth/signUp/setting/setting.dto";
import { status } from "../../../../../config/response.status";
export const getSettingService = async (userId: string) => {
    const result = await getSettingDao(userId);

    const res_body: getSettingResDto = {
        user_icon: result[0].user_icon,
        user_name: result[0].user_name,
        team_info: result.map((row) => ({
            team_id: row.team_id as number,
            team_name: row.team_name as string,
            team_icon_flag: row.team_icon_flag as string
        }))
    };

    const body: BaseApiResponse<getSettingResDto> = {
        ...status.SUCCESS.body,
        result: {
            ...res_body
        }
    };
    return body;

};

export const patchSettingService = async (userId: string, data: patchSettingDto) => {
    await patchSettingDao(userId, data);
    const body: BaseApiResponse<null> = {
        ...status.SUCCESS.body,
        result: null
    };
    return body;
};
