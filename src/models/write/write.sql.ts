const BlogSQL = {
  getBlogPostsCount: `
    SELECT 
        COUNT(*) AS totalCount
    FROM 
        blog_post a
    JOIN
        user u 
        ON a.user_id = u.id
    WHERE
        {{cursorCondition}}
  `,

  getBlogPosts: `
    SELECT 
        a.id,
        a.title,
        a.body,
        a.created_at,
        u.name AS user_name,
        GROUP_CONCAT(i.url SEPARATOR ', ') AS image_urls,
        COALESCE(c.comment_count, 0) AS comment_count,
        COALESCE(pl.like_count, 0) AS like_count
    FROM
        blog_post a
    JOIN
        user u 
        ON a.user_id = u.id
    LEFT JOIN
        image i
        ON a.id = i.post_id
    LEFT JOIN 
        (SELECT post_id, COUNT(*) AS comment_count
        FROM comment
        GROUP BY post_id) c
        ON a.id = c.post_id
    LEFT JOIN 
        (SELECT post_id, COUNT(*) AS like_count
        FROM post_like
        GROUP BY post_id) pl
        ON a.id = pl.post_id
    WHERE
        {{cursorCondition}}
    GROUP BY
        a.id
    ORDER BY 
        a.id DESC
    LIMIT ?
  `,

  getPostComments: `
    SELECT
        c.id AS comment_id,
        c.body AS comment,
        c.created_at AS date,
        u.id AS author_id,
        u.name AS author_name
    FROM
        comment c
    JOIN
        user u
        ON c.user_id = u.id
    WHERE
        c.post_id = ?
    ORDER BY 
        c.created_at
  `,

  getPostReplies: `
    SELECT
        r.id AS reply_id,
        r.comment_id AS comment_id,
        r.body AS comment,
        r.created_at AS date,
        u.id AS author_id,
        u.name AS author_name
    FROM
        reply r
    JOIN
        user u
        ON r.user_id = u.id
    WHERE
        r.post_id = ?
    ORDER BY 
        r.created_at
  `,

  getUserLikeStatus: `
    SELECT
        COUNT(*) AS count
    FROM
        post_like
    WHERE
        user_id = ? AND post_id = ?
  `,

  insertLike: `
    INSERT INTO
        post_like (user_id, post_id, post_type)
    VALUES
        (?, ?, 'blog_post')
  `,

  deleteLike: `
    DELETE FROM
        post_like
    WHERE
        user_id = ? AND post_id = ?
  `,

  insertBlogPost: `
    INSERT INTO
        blog_post (title, body, user_id)
    VALUES
        (?, ?, ?)
  `,

  insertImageIntoPost: `
    INSERT INTO
        image (url, post_id)
    VALUES
        (?, ?)
  `,

  insertPostComment: `
    INSERT INTO
        comment (post_id, user_id, body)
    VALUES
        (?, ?, ?)
  `,

  insertPostReply: `
    INSERT INTO
        reply (post_id, comment_id, user_id, body)
    VALUES
        (?, ?, ?, ?)
  `,

  insertMatchResult: `
    INSERT INTO
        match_result (post_id, match_date, team_a, team_b, result)
    VALUES
        (?, ?, ?, ?, ?)
  `,

  getPostAuthorId: `
    SELECT
        user_id
    FROM
        blog_post
    WHERE
        id = ?
  `,

  deleteBlogPost: `
    DELETE FROM
        blog_post
    WHERE
        id = ?
  `,
};

export default BlogSQL;
