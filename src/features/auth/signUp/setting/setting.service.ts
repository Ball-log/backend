import { getSettingDao } from "../../../../models/auth/signUp/setting/setting.dao";
import { getSettingDto } from "../../../../models/auth/signUp/setting/setting.dto";

export const getSettingService = async (userId: string) => {
    const result = await getSettingDao(userId);

    const body: getSettingDto = {
        user_id: result[0].user_id,
        user_icon: result[0].user_icon,
        user_name: result[0].user_name,
        team_info: result.map((row) => ({
            team_id: row.team_id as number,
            team_name: row.team_name as string,
            team_icon_flag: row.team_icon_flag as string
        }))
    };
    return body;

};
