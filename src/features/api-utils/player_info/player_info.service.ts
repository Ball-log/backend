import { status } from "../../../../config/response.status";
import { player_infoDao } from "../../../models/api-util/player_info/player_info.dao";
import { BaseApiResponse } from "../../../../config/response";
import { RowDataPacket } from "mysql2";

export const player_infoService =  {
    get: async (match_id: number) =>{
        const result = await player_infoDao.get(match_id)
        const body: BaseApiResponse<RowDataPacket[]> = {
            ...status.SUCCESS.body,
            result: result
        }
        return body;
    }
};
