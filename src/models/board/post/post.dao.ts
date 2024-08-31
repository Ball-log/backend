import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { blogDto, mvpDto } from "./post.dto";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { postSql, tempPostSql } from "./post.sql";
import { Json } from "aws-sdk/clients/robomaker";


export const postDao = {
    getType: async (post_id: number) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<RowDataPacket[]>(tempPostSql.getType, [ post_id ]);
            connection.release();
            return result[0].type;
        } catch {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    getMatch: async (match_id: number) => {
        const connection = await getPool().getConnection();
        try {
            const [ [ match ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getMatch, [ match_id ]);
            connection.release();
            return match;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    getBlog: async (post_id: number, user_id: string) => {

        const connection = await getPool().getConnection();
        try {
            const [ [ blog ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getBlog, [ user_id, post_id  ]);
            const [ [ imgUrls ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getImgUrls, [ post_id ]);
            const [ comment ] = await connection.query<RowDataPacket[]>(tempPostSql.getComment, [ user_id, post_id ]);
            const [ reply ] = await connection.query<RowDataPacket[]>(tempPostSql.getRepyl, [ user_id, post_id ]);
            const [ [ likeCount ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getLikeCount, [ post_id ]);
            const [ [ hasLike ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getHasliked, 
                [ post_id, user_id ]);
            connection.release();
            return [ blog, imgUrls, comment, reply, likeCount, hasLike ];
        } catch (error) {
            console.log(error);
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    getMvp: async (post_id: number, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ [ mvp ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getMvp, [ user_id, post_id  ]);
            const [ [imgUrls] ] = await connection.query<RowDataPacket[]>(tempPostSql.getImgUrls, [ post_id ]);
            const [ comment ] = await connection.query<RowDataPacket[]>(tempPostSql.getComment, [ user_id, post_id ]);
            const [ reply ] = await connection.query<RowDataPacket[]>(tempPostSql.getRepyl, [ user_id, post_id ]);
            const [ [ likeCount ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getLikeCount, [ post_id ]);
            const [ [ hasLike ] ] = await connection.query<RowDataPacket[]>(tempPostSql.getHasliked, 
                [ post_id, user_id ]);


            connection.release();
            return [ mvp, imgUrls, comment, reply, likeCount, hasLike ];
        } catch (error) {
            console.log(error);
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },

    postBlog: async (req: blogDto, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.postBlog, [
                req.title,
                req.body,
                req.img_urls[0],
                user_id,
                req.match_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            console.log(error);
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    postMvp: async (req: mvpDto, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.postMvp, [
                req.playerId,
                req.playerRecord,
                req.img_urls[0],
                user_id,
                req.match_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },

    postImg: async (imgSet: Json, post_id: number, post_type: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.postImg, [
                imgSet,
                post_id,
                post_type
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            console.log(error);
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    patchImg: async (imgSet: Json, post_id: number) => {
        const connection = await getPool().getConnection();

        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.patchImg, [
                imgSet,
                post_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            console.log(error);
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },

    patchBlog: async (req: blogDto, post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.patchBlog, [
                req.title,
                req.body,
                req.img_urls[0],
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    patchMvp: async (req: mvpDto, post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.patchMvp, [
                req.playerId,
                req.playerRecord,
                req.img_urls[0],
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    deleteBlog: async (post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.deleteBlog, [
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    deleteMvp: async (post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.deleteMvp, [
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
};
