const BlogSQL = {
  getBlogPosts: `
    SELECT SQL_CALC_FOUND_ROWS * FROM blogs
    WHERE id < ?
    ORDER BY id DESC
    LIMIT ?, ?
  `,
  getTotalCount: `
    SELECT FOUND_ROWS() as totalCount
  `,
  createBlogPost: `
    INSERT INTO blogs (title, content, author)
    VALUES (?, ?, ?)
  `,
};

export default BlogSQL;
