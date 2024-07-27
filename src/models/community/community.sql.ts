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
        GROUP_CONCAT(ai.url SEPARATOR ', ') AS image_urls,
        COALESCE(ac.comment_count, 0) AS comment_count,
        COALESCE(al.like_count, 0) AS like_count
    FROM
        article a
    JOIN
        user u 
        ON a.user_id = u.id
    LEFT JOIN
        article_image ai
        ON a.id = ai.article_id
    LEFT JOIN 
        (SELECT article_id, COUNT(*) AS comment_count
        FROM article_comment
        GROUP BY article_id) ac
        ON a.id = ac.article_id
    LEFT JOIN 
        (SELECT article_id, COUNT(*) AS like_count
        FROM article_like
        GROUP BY article_id) al
        ON a.id = al.article_id
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
        GROUP_CONCAT(ai.url SEPARATOR ', ') AS image_urls,
        COALESCE(al.like_count, 0) AS like_count
    FROM 
        article a
    JOIN
        user u
        ON a.user_id = u.id
    LEFT JOIN
        article_image ai
        ON a.id = ai.article_id
    LEFT JOIN
        (SELECT article_id, COUNT(*) AS like_count
        FROM article_like
        GROUP BY article_id) al
        ON a.id = al.article_id
    WHERE
        a.id = ?
    GROUP BY
        a.id
  `,
  getPostComments: `
    SELECT
        ac.id AS comment_id,
        ac.body AS comment,
        ac.created_at AS date,
        u.id AS author_id,
        u.name AS author_name
    FROM
        article_comment ac
    JOIN
        user u
        ON ac.user_id = u.id
    WHERE
        ac.article_id = ?
  `,
  getPostReplies: `
    SELECT
        ar.id AS reply_id,
        ar.comment_id AS comment_id,
        ar.body AS comment,
        ar.created_at AS date,
        u.id AS author_id,
        u.name AS author_name
    FROM
        article_reply ar
    JOIN
        user u
        ON ar.user_id = u.id
    WHERE
        ar.article_id = ?
  `,
  postPost: "",
  getUserLikeStatus: `
    SELECT
        COUNT(*) AS count
    FROM
        article_like
    WHERE
        user_id = ? AND article_id = ?
  `,
  insertLike: `
    INSERT INTO
        article_like (user_id, article_id)
    VALUES
        (?, ?)
  `,
  deleteLike: `
    DELETE FROM
        article_like
    WHERE
        user_id = ?
        AND article_id = ?
  `,
};

export default CommunitySQL;
