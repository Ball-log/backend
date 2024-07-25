import { settingSql } from "./setting.slq";
import { getPool }  from "./../../../../../config/db.pool";
import { RowDataPacket } from "mysql2/promise";

export const getSettingDao = async (userId: string): Promise<RowDataPacket[]> => {
    const pool = getPool();
    try {
        const [ result ] = await pool.query<RowDataPacket[]>(settingSql.getSettingSql, [ userId ]);
        return result;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to get setting data");
    }
};
