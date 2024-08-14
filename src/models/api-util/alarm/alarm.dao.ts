import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { alarmDeleteDto } from "./alarm.dto";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { alarmSql } from "./alarm.sql";
import { commentPostDto } from "../comment/comment.dto";
import { replyPostDto } from "../reply/reply.dto";
import { post_likeDto } from "../post_like/post_like.dto";

export const alarmDao = {
    post: async (req: commentPostDto | replyPostDto | post_likeDto,  message: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(alarmSql.post, [
                req.post_user_id,
                req.post_id,
                req.post_type,
                message
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            console.log(error);
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    get: async (user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<RowDataPacket[]>(alarmSql.get, [
                user_id
            ]);
            connection.release();
            return result;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR)
        }
    },
    delete: async (req: alarmDeleteDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            await connection.query<ResultSetHeader>(alarmSql.delete, [
                req.id,
                user_id
            ]);
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
}