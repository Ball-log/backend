import { settingSql } from "./setting.slq";
import { getPool }  from "./../../../../../config/db.pool";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { patchSettingDto } from "./setting.dto";
import { ApiError } from "../../../../../config/error";
import { status } from "../../../../../config/response.status";

export const getSettingDao = async (userId: string): Promise<RowDataPacket[]> => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<RowDataPacket[]>(settingSql.getSettingSql, [ userId ]);
        connection.release();
        return result;
    } catch (err) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};

export const patchSettingDao = async (user_id: string, data: patchSettingDto) => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<ResultSetHeader>(settingSql.patchSettingSql,
            [ data.user_icon, data.user_team_id, user_id ]);
        connection.release();
        return result.insertId;
    } catch (e) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};
