import { teamSetSql } from "./teamSetting.sql";
import { getPool } from "../../../../config/db.pool";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const getTeamSetDao = async (): Promise<RowDataPacket[]> => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<RowDataPacket[]>(teamSetSql.getSql);
        connection.release();
        return result;
    } catch (error) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};

export const patchTeamSetDao = async (team_id: number, user_id: string) => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<ResultSetHeader>(teamSetSql.patchSql, [ team_id, user_id ]);
        connection.release();
        return result.affectedRows;
    } catch (error) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};
