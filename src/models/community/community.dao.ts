import { RowDataPacket } from "mysql2";
import CommunitySQL from "./community.sql";
import { getPool } from "../../../config/db.pool";
import { PostThumbnail } from "./community.dto";

const CommunityDao = {
  getPosts: async (
    type: string,
    page: number,
    cursor?: number
  ): Promise<{ totalCount: number; posts: PostThumbnail[] }> => {
    // type이 "league"면
    let typeCondition = "";
    if (type === "team") {
      typeCondition = `a.team_id = u.team_id`;
    } else if (type === "league") {
      typeCondition = `a.team_id IS NULL`;
    }

    // 페이징 첫 조회라면 cursor가 없으니깐 빈 문자열로
    const cursorCondition = cursor ? `AND a.id < ?` : "";
    // total Count를 세기 위한 쿼리
    const postCountQuery = CommunitySQL.getPostsCount
      .replace("{{typeCondition}}", typeCondition)
      .replace("{{cursorCondition}}", cursorCondition);
    // post 데이터를 가져오기 위한 쿼리
    const postsQuery = CommunitySQL.getPosts
      .replace("{{typeCondition}}", typeCondition)
      .replace("{{cursorCondition}}", cursorCondition);

    const postCountParams: (string | number)[] = [];
    const postsParams: (string | number)[] = [];
    if (cursor) {
      postCountParams.push(cursor);
      postsParams.push(cursor);
    }
    postsParams.push(`${page}`);

    const pool = getPool();
    const [countRows] = await pool.execute(postCountQuery, postCountParams);
    const totalCount = (countRows as any[])[0].totalCount;

    if (totalCount == 0) {
      return { totalCount, posts: [] };
    }

    const [rows] = await pool.execute<RowDataPacket[]>(postsQuery, postsParams);
    // post 썸네일 타입으로 매핑
    const posts: PostThumbnail[] = rows.map((row) => ({
      postId: row.id,
      title: row.title,
      content: row.body,
      authorName: row.user_name,
      date: row.created_at,
      likeCount: row.like_count,
      commentCount: row.comment_count,
      imageUrls: row.imageUrls ? row.imageUrls.split(", ") : [],
    }));

    return { totalCount, posts: posts };
  },
};

export default CommunityDao;
