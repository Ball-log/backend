const CommunitySQL = {
  getPostsCount: ` 
    SELECT 
        COUNT(*) AS totalCount
    FROM 
        article a
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
  getPostDetail: "",
  postPost: "",
};

export default CommunitySQL;
