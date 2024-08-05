import { backImgSql } from "./backgroundImg.sql";
import { getPool } from "../../../../config/db.pool";
import { ResultSetHeader } from "mysql2/promise";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const patchBackImgDao = async (userId: string, url: string) => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<ResultSetHeader>(backImgSql, [ url, userId ]);
        connection.release();
        return result.affectedRows;
    } catch (err) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};
