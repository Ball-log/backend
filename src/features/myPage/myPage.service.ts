import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import { getMyPageDao } from "../../models/myPage/myPage.dao";
import { getMyPageResDto } from "../../models/myPage/myPage.dto";


export const getMyPageService = async (userId: string) => {
    const result = await getMyPageDao(userId);
    const res_result: getMyPageResDto = {
        team_id: result[0].team_id,
        team_icon_round: result[0].team_icon_round,
        user_background_img: result[0].user_background_img,
        user_name: result[0].user_name,
        user_icon_url: result[0].user_icon_url,
        match_date: result[0].match_date,
        user_team_icon_flag: result[0].user_team_icon_flag,
        opposition_icon_flag: result[0].opposition_team_icon_flag,
        user_team_score: result[0].user_team_score,
        opposition_score: result[0].opposition_team_score,
        writed_date_list: result[0].writed_date_list ? result.map((row) => row.writed_date_list) : null
    };
    const body: BaseApiResponse<getMyPageResDto> = {
        ...status.SUCCESS.body,
        result: {
            ...res_result
        }
    };
    return body;
};
