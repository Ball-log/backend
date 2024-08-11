import { RowDataPacket } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { matchInfoSql } from "./matchInfo.sql";
export const matchInfoDao = {
    get: async (date: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<RowDataPacket[]>(matchInfoSql.get, [
                date
            ]);
            connection.release();
            return result;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
}