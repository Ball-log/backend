import { status } from "../../../../config/response.status";
import { matchInfoDao } from "../../../models/api-util/matchInfo/matchInfo.dao";
import { BaseApiResponse } from "../../../../config/response";
import { RowDataPacket } from "mysql2";


export const matchInfoService =  {
    get: async (date: string) =>{
        const result = await matchInfoDao.get(date)
        const body: BaseApiResponse<RowDataPacket[]> ={
            ...status.SUCCESS.body,
            result: result
        }
        return body;
    }
};
