export const postSql = {
    getBlogSql:
        `SELECT
            b.id AS blog_id,
            b.thumbnail_url AS blog_thumbnail,
            b.title AS blog_title,
            b.created_at AS blog_created_at,
            COUNT(DISTINCT p.id) AS blog_count_like,
            COUNT(DISTINCT c.id) + COUNT(DISTINCT r.id) AS blog_count_comment
        FROM blog b
        LEFT JOIN comment c ON b.id = c.post_id
        LEFT JOIN reply r ON b.id = r.post_id
        LEFT JOIN post_like p ON b.id = p.post_id
        WHERE b.user_id = ?
        AND DATE(b.created_at) = ?
        GROUP BY b.id, b.thumbnail_url, b.title, b.created_at`,
    getMvpSql:
        `SELECT
            m.id AS mvp_id,
            m.thumbnail_url AS mvp_thumbnail,
            pl.name AS mvp_player_name,
            m.player_record AS mvp_player_record,
            m.created_at AS mvp_created_at,
            COUNT(DISTINCT p.id) AS mvp_count_like,
            COUNT(DISTINCT c.id) + COUNT(DISTINCT r.id) AS mvp_count_comment
        FROM mvp m
        LEFT JOIN player pl ON m.player_id = pl.id
        LEFT JOIN comment c ON m.id = c.post_id
        LEFT JOIN reply r ON m.id = r.post_id
        LEFT JOIN post_like p ON m.id = p.post_id
        WHERE m.user_id = ?
        AND DATE(m.created_at) = ?
        GROUP BY m.id, m.thumbnail_url, pl.name, m.player_record, m.created_at`
};
