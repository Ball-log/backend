import { RowDataPacket } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { player_infoSql } from "./player_info.sql";
export const player_infoDao = {
    get: async (match_id: number) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<RowDataPacket[]>(player_infoSql.get, [
                match_id
            ]);
            connection.release();
            return result;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
}