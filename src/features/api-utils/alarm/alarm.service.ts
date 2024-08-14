import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { alarmDao } from "../../../models/api-util/alarm/alarm.dao";
import { alarmDeleteDto, alarmGetDto } from "../../../models/api-util/alarm/alarm.dto";

export const alarmService = {
    get: async (user_id: string) => {
        const result = await alarmDao.get(user_id) as alarmGetDto[];
        const body: BaseApiResponse<alarmGetDto[]> = {
            ...status.SUCCESS.body,
            result: [
                ...result
            ]
        };
        return body;
    },
    delete: async (req: alarmDeleteDto, user_id: string) => {
        const result = await alarmDao.delete(req, user_id);
        const body: BaseApiResponse<null> = {
            ...status.SUCCESS.body,
            result: null
        };
        return body;
    }
}