import { getLoginSql } from "./login.sql";
import { getPool }  from "./../../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";
import { status } from "../../../../config/response.status";
import { ApiError } from "../../../../config/error";

export const getLoginDao = async (user: string): Promise<RowDataPacket[]> => {
    const connection = await getPool().getConnection();
    try {
        const [ result ] = await connection.query<RowDataPacket[]>(getLoginSql, [ user ]);
        const isPasswordMatched = result[0].isExistEmail;
        connection.release();
        return isPasswordMatched;
    } catch (e) {
        throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
    }
};
