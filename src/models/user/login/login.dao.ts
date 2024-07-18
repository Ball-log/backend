import { postLoginReqDto } from "./login.dto";
import { postLoginSql } from "./login.sql";
import { getPool }  from "./../../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";

export const postLoginDao = async (user: postLoginReqDto): Promise<RowDataPacket[]> => {
    const pool = getPool();
    const [ result ] = await pool.query<RowDataPacket[]>(postLoginSql, [ user.email, user.password ]);
    const isPasswordMatched = result[0].isExistEmail;
    return isPasswordMatched;
};
