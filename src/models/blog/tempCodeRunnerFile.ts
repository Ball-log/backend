// import { getBlogPostsResDto, createBlogPostReqDto } from "./blog.dto";
// import { getPool } from "../../../config/db.pool";
// import BlogSQL from "./blog.sql";

// const BlogDao = {
//   getBlogPosts: async (
//     page: number,
//     cursor: number | undefined
//   ): Promise<getBlogPostsResDto> => {
//     const pool = getPool();
//     const connection = await pool.getConnection();

//     try {
//       const query = BlogSQL.getBlogPosts;
//       const params = [(page - 1) * limit, limit];
//       const [rows]: any = await connection.query(query, params);

//       const totalCount = await BlogDao.getTotalBlogPostCount();

//       return {
//         totalCount,
//         posts: rows.map((row: any) => ({
//           id: row.id,
//           title: row.title,
//           body: row.body,
//           author: row.user_id,
//           createdAt: row.created_at,
//           updatedAt: row.updated_at,
//         })),
//       };
//     } catch (error) {
//       console.error("Error in getBlogPosts: ", error);
//       throw error;
//     } finally {
//       connection.release();
//     }
//   },

//   createBlogPost: async (
//     postData: createBlogPostReqDto
//   ): Promise<{ insertId: number }> => {
//     const pool = getPool();
//     const connection = await pool.getConnection();

//     try {
//       const query = BlogSQL.createBlogPost;
//       const params = [postData.title, postData.body, postData.user_id];
//       const [result]: any = await connection.query(query, params);
//       return { insertId: result.insertId };
//     } catch (error) {
//       console.error("Error in createBlogPost: ", error);
//       throw error;
//     } finally {
//       connection.release();
//     }
//   },

//   getTotalBlogPostCount: async (): Promise<number> => {
//     const pool = getPool();
//     const connection = await pool.getConnection();

//     try {
//       const query = "SELECT COUNT(*) AS total FROM blog_posts";
//       const [rows]: any = await connection.query(query);
//       return rows[0].total;
//     } catch (error) {
//       console.error("Error in getTotalBlogPostCount: ", error);
//       throw error;
//     } finally {
//       connection.release();
//     }
//   },
// };

// export default BlogDao;
