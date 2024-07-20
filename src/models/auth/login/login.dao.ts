import { getLoginSql } from "./login.sql";
import { getPool }  from "./../../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";

export const getLoginDao = async (user: string): Promise<RowDataPacket[]> => {
    const pool = getPool();
    const [ result ] = await pool.query<RowDataPacket[]>(getLoginSql, [ user ]);
    const isPasswordMatched = result[0].isExistEmail;
    return isPasswordMatched;
};
