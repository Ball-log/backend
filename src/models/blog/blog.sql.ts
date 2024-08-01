const BlogSQL = {
  getBlogPosts: `
    SELECT SQL_CALC_FOUND_ROWS 
      id, 
      title, 
      body, 
      author, 
      created_at AS createAt,
      updated_at AS updatedAt
    FROM blogs
    WHERE id < ?
    ORDER BY id DESC
    LIMIT ?, ?
  `,
  getTotalCount: `
    SELECT FOUND_ROWS() as totalCount
  `,
  createBlogPost: `
    INSERT INTO blogs (
      title, 
      body, 
      public, 
      thumbnail_url, 
      created_at, 
      updated_at, 
      user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
};

export default BlogSQL;
