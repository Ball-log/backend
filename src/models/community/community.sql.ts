const CommunitySQL = {
    getPostsCount: ` 
    SELECT 
        COUNT(*) AS totalCount
    FROM 
        article a
    JOIN
        user u 
        ON a.user_id = u.id
    WHERE
        {{typeCondition}}
        {{cursorCondition}}
    `,
    getPosts: ` 
    SELECT 
        a.*,
        u.name AS user_name,
        GROUP_CONCAT(i.url SEPARATOR ', ') AS image_urls,
        COALESCE(c.comment_count, 0) AS comment_count,
        COALESCE(pl.like_count, 0) AS like_count
    FROM
        article a
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
        {{typeCondition}}
        {{cursorCondition}}
    ORDER BY 
        a.id DESC
    LIMIT ?
    `,
    getPostDetail: `
    SELECT
        a.title,
        a.content,
        a.created_at AS date,
        u.id AS author_id,
        u.name AS author_name,
        u.icon_url AS author_profile_url,
        GROUP_CONCAT(i.url SEPARATOR ', ') AS image_urls,
        COALESCE(pl.like_count, 0) AS like_count
    FROM 
        article a
    JOIN
        user u
        ON a.user_id = u.id
    LEFT JOIN
        image i
        ON a.id = i.post_id
    LEFT JOIN
        (SELECT post_id, COUNT(*) AS like_count
        FROM post_like
        GROUP BY post_id) pl
        ON a.id = pl.post_id
    WHERE
        a.id = ?
    GROUP BY
        a.id
  `,
    getPostComments: `
    SELECT
        c.post_id AS comment_id,
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
    getUserTeamId: `
    SELECT
        team_id
    FROM
        user
    WHERE
        id = ?
  `,
    insertPost: `
    INSERT INTO
        article
        (title, content, team_id, user_id)
    VALUES
        (?, ?, ?, ?)
  `,
    insertImageIntoPost: `
    INSERT INTO
        image
        (url, post_id, post_type)
    VALUES
        (?, ?, 'article')

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
        (?, ?, 'article')
  `,
    deleteLike: `
    DELETE FROM
        post_like
    WHERE
        user_id = ?
        AND post_id = ?
  `,
    insertPostComment: `
    INSERT INTO
        comment (post_id, user_id, body, post_type)
    VALUES
        (?, ?, ?, 'article')
  `,
    insertPostReply: `
    INSERT INTO
        reply (post_id, comment_id, user_id, body, post_type)
    VALUES
        (?, ?, ?, ?, 'article')
  `,
    getPostAuthorId: `
    SELECT
        user_id
    FROM
        article
    WHERE
        id = ?
  `,
    deletePost: `
    DELETE FROM
        article
    WHERE
        id = ?
  `,
    updatePost: `
    UPDATE 
        article
    SET 
        title = ?, content = ?, updated_at = NOW()
    WHERE
        id = ?
  `,
    deletePostImages: `
    DELETE FROM
        image
    WHERE
        post_id = ? 
        AND post_type = 'article'
        AND id IN (?)
  `
};

export default CommunitySQL;
