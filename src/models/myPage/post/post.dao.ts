import { getPool } from "../../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";
import { postSql } from "./post.sql";

export const getPostDao = async (userId: string, date: string): Promise<RowDataPacket[][]> => {
    const connection = await getPool().getConnection();
    try {
        const [ blog ] = await connection.query<RowDataPacket[]>(postSql.getBlogSql, [ userId, date ]);
        const [ mvp ] = await connection.query<RowDataPacket[]>(postSql.getMvpSql, [ userId, date ]);

        connection.release();
        return [ blog, mvp ];
    } catch (error) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};
