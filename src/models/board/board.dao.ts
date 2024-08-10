import { ResultSetHeader, RowDataPacket } from "mysql2";
import BoardSQL from "./board.sql";
import { getPool } from "../../../config/db.pool";
import { blogDto, CommentDto, MvpDto, ReplyDto } from "./board.dto";
import { MatchInfoDto } from "./board.dto";
import { populate } from "dotenv";
import { ResultSet } from "aws-sdk/clients/athena";
import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

const BoardDao = {
    insertblog: async (req: blogDto, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(BoardSQL.insertBlog, [
                req.title,
                req.body,
                req.thumbnailUrl,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    insertMvp: async (req: MvpDto, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(BoardSQL.insertMvp, [
                req.playerId,
                req.playerRecord,
                req.thumbnailUrl,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    insertComment: async (req: CommentDto, user_id: string, post_id: number): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(BoardSQL.insertComment, [
                post_id,
                user_id,
                req.body,
                req.type
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    insertReply: async (req: ReplyDto, user_id: string, post_id: number): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(BoardSQL.insertComment, [
                post_id,
                user_id,
                req.commentId,
                req.body,
                req.type
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    insertImageIntoPost: async (url: string, postId: string): Promise<void> => {
        const pool = getPool();
        await pool.query(BoardSQL.insertImageIntoPost, [ url, postId ]);
    },

    getPostAuthorId: async (postId: string): Promise<string> => {
        const pool = getPool();
        const [ result ] = await pool.query<RowDataPacket[]>(
            BoardSQL.getPostAuthorId,
            [ postId ]
        );
        return result[0].userId;
    },


    insertMatchInfo: async (matchInfo: any, postId: number): Promise<void> => {
        const pool = getPool();
        await pool.query(BoardSQL.insertMatchInfo, [
            matchInfo.home_team_id,
            matchInfo.away_team_id,
            matchInfo.match_date,
            postId,
            matchInfo.home_team_score,
            matchInfo.away_team_score
        ]);
    },

    // updatePost: async (
    //   postId: string,
    //   title: string,
    //   body: string,
    //   publicStatus: boolean,
    //   thumbnailUrl: string,
    //   userId: string
    // ): Promise<void> => {
    //   const pool = getPool();
    //   await pool.query(BoardSQL.updatePost, [
    //     title,
    //     body,
    //     publicStatus,
    //     thumbnailUrl,
    //     userId,
    //     postId,
    //   ]);
    // },

    // updateMvp: async (
    //   postId: string,
    //   title: string,
    //   playerId: string,
    //   playerRecord: string,
    //   publicStatus: boolean,
    //   thumbnailUrl: string,
    //   userId: string
    // ): Promise<void> => {
    //   const pool = getPool();
    //   await pool.query(BoardSQL.updateMvp, [
    //     title,
    //     playerId,
    //     playerRecord,
    //     publicStatus,
    //     thumbnailUrl,
    //     userId,
    //     postId,
    //   ]);
    // },

    // updateMatchInfo: async (
    //   matchInfo: MatchInfoDto,
    //   postId: string
    // ): Promise<void> => {
    //   const pool = getPool();
    //   await pool.query(BoardSQL.updateMatchInfo, [matchInfo, postId]);
    // },

    getPost: async (postId: string): Promise<PostDto | null> => {
        const pool = getPool();
        const [ results ] = await pool.query<RowDataPacket[]>(BoardSQL.getPostById, [
            postId
        ]);
        return results.length > 0 ? (results[0] as PostDto) : null;
    },

    // 게시글 삭제
    deletePost: async (postId: string): Promise<boolean> => {
        const pool = getPool();
        const [ result ] = await pool.query<ResultSetHeader>(BoardSQL.deletePost, [
            postId
        ]);
        return result.affectedRows > 0;
    },

    // 댓글 삽입


    // 대댓글 삽입


    // 댓글 id로 댓글 갖고오기
    getCommentById: async (commentId: string): Promise<RowDataPacket | null> => {
        const pool = getPool();
        const [ results ] = await pool.query<RowDataPacket[]>(
            BoardSQL.getCommentById,
            [ commentId ]
        );
        return results.length > 0 ? results[0] : null;
    },

    // 댓글 조회
    getComments: async (postId: string): Promise<RowDataPacket[]> => {
        const pool = getPool();
        const [ results ] = await pool.query<RowDataPacket[]>(BoardSQL.getComments, [
            postId
        ]);
        return results;
    },

    // 댓글 수정
    updateComment: async (commentId: string, body: string): Promise<boolean> => {
        const pool = getPool();
        const [ result ] = await pool.query<ResultSetHeader>(BoardSQL.updateComment, [
            body,
            commentId
        ]);
        return result.affectedRows > 0;
    },

    // 댓글 삭제
    deleteComment: async (commentId: string): Promise<boolean> => {
        const pool = getPool();
        const [ result ] = await pool.query<ResultSetHeader>(BoardSQL.deleteComment, [
            commentId
        ]);
        return result.affectedRows > 0;
    },

    deleteImagesFromPost: async (postId: string): Promise<void> => {
        const pool = getPool();
        await pool.query(BoardSQL.deleteImagesFromPost, [ postId ]);
    },

    // 좋아요 추가
    addLike: async (
        userId: string,
        postId: string,
        postType: "blog" | "mvp"
    ): Promise<void> => {
        const pool = getPool();
        const now = new Date();
        await pool.query(BoardSQL.addLike, [ userId, postId, postType ]);
    },

    // 좋아요 삭제
    removeLike: async (userId: string, postId: string): Promise<void> => {
        const pool = getPool();
        await pool.query(BoardSQL.removeLike, [ userId, postId ]);
    },

    // 사용자 좋아요 여부 확인
    checkUserLike: async (userId: string, postId: string): Promise<boolean> => {
        const pool = getPool();
        const [ rows ] = await pool.query<RowDataPacket[]>(BoardSQL.checkUserLike, [
            userId,
            postId
        ]);
        return rows.length > 0;
    },

    // 게시글 총 좋아요 수
    getLikeCount: async (postId: string): Promise<number> => {
        const pool = getPool();
        const [ rows ] = await pool.query<RowDataPacket[]>(BoardSQL.getLikeCount, [
            postId
        ]);
        return rows.length > 0 ? rows[0].likeCount : 0;
    }
};

export default BoardDao;
