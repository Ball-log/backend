import { postLoginSql } from "./login.sql";
import { getPool }  from "./../../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";

export const postLoginDao = async (user: string): Promise<RowDataPacket[]> => {
    const pool = getPool();
    const [ result ] = await pool.query<RowDataPacket[]>(postLoginSql, [ user ]);
    const isPasswordMatched = result[0].isExistEmail;
    return isPasswordMatched;
};
