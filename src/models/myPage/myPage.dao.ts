import { myPageSql } from "./myPage.sql";
import { getPool } from "../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";
import { status } from "../../../config/response.status";
import { ApiError } from "../../../config/error";

export const getMyPageDao = async (userId: string): Promise<RowDataPacket[]> => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<RowDataPacket[]>(myPageSql.getSql, [ userId, userId, userId ]);
        connection.release();
        return result;
    } catch (err) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};
