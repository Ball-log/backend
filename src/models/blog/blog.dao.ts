import { getBlogPostsResDto, createBlogPostReqDto } from "./blog.dto";
import { getPool } from "../../../config/db.pool";
import BlogSQL from "./blog.sql";

const BlogDao = {
  getBlogPosts: async (
    page: number,
    cursor?: number
  ): Promise<getBlogPostsResDto | null> => {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
      let query = BlogSQL.getBlogPosts;
      const params: (number | undefined)[] = [];

      if (cursor) {
        query = query.replace("WHERE id < ?", "WHERE id < ?");
        params.push(cursor);
      }

      params.push((page - 1) * 10, 10);

      const [rows]: any = await connection.query(query, params);
      const [totalCountRows]: any = await connection.query(
        BlogSQL.getTotalCount
      );

      if (rows.length > 0) {
        return {
          totalCount: totalCountRows[0].totalCount,
          posts: rows,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in getBlogPosts: ", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  createBlogPost: async (
    postData: createBlogPostReqDto
  ): Promise<{ insertId: number }> => {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
      const query = BlogSQL.createBlogPost;
      const params = [postData.title, postData.content, postData.author];
      const [result]: any = await connection.query(query, params);
      return { insertId: result.insertId };
    } catch (error) {
      console.error("Error in createBlogPost: ", error);
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default BlogDao;
