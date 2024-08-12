export const postSql = {
    postBlog: "INSERT INTO blog(title, body, thumbnail_url, user_id, match_info) VALUES (?, ?, ?, ?, ?)",
    postImg: "INSERT INTO image (url, post_id, post_type) VALUES (?, ?, ?)",
    postMvp: "INSERT INTO mvp (player_id, player_record, thumbnail_url, user_id, match_info) VALUES (?, ?, ?, ?, ?)",
    patchBlog: `
        UPDATE blog
        SET 
            title = ?,
            body = ?,
            thumbnail_url = ?
        WHERE 
            id = ? and user_id = ?`,
    patchMvp: `
        UPDATE mvp
        SET 
            player_id = ?,
            player_record = ?,
            thumbnail_url = ?
        WHERE 
            id = ? and user_id = ?`,
    deleteBlog: "DELETE FROM blog WHERE id = ? and user_id = ?",
    deleteMvp: "DELETE FROM mvp WHERE id = ? and user_id = ?"

};

export const tempPostSql = {
    getType: "SELECT type from global_post_id WHERE id = ?",
    getMvp: `
        SELECT
            
            p.name as player_name,
            m.player_record as player_record,
            m.created_at as created_at,
            m.updated_at as updated_at,
            m.user_id as user_id,
            u.name as user_name,
            u.icon_url as user_icon_url,
            m.match_info as match_info
            CASE 
                WHEN u.id = ? THEN true
                ELSE false
            END AS isMine
        FROM mvp m join user u on m.user_id = u.id join player p on m.player_id = p.id
        where m.id = ?`,
    getBlog: `
        SELECT
            "blog" as post_type,
            b.title as title,
            b.body as body,
            b.created_at as created_at,
            b.updated_at as updated_at,
            b.user_id as user_id,
            u.name as user_name,
            u.icon_url as user_icon_url,
            b.match_info as match_id,
            CASE 
                WHEN u.id = ? THEN true
                ELSE false
            END AS isMine
        FROM blog b join user u on b.user_id = u.id
        where b.id = ?`,
    getImgUrls: `
        SELECT
            image.url AS img_url
        FROM image
        WHERE post_id = ?`,
    getMatch: 
        `SELECT 
            m.match_date,
            m.id as match_id,
            m.home_team_id as home_team_id,
            m.away_team_id as away_team_id,
            t1.name as home_team_name,
            t2.name as away_team_name,
            t1.icon_flag as home_team_icon_flag,
            t2.icon_flag as away_team_icon_flag,
            m.home_team_score as home_team_score,
            m.away_team_score as away_team_score
        FROM matchinfo m 
            JOIN team t1 ON m.home_team_id = t1.id 
            JOIN team t2 ON m.away_team_id = t2.id
        WHERE m.id = ? `,
    getComment: `
        SELECT
            c.id as comment_id,
            u.id as comment_user_id,
            u.name as comment_user_name,
            u.icon_url as comment_user_icon_url,
            c.body as comment_body,
            c.created_at as comment_date,
            CASE 
                WHEN u.id = ? THEN true
                ELSE false
            END AS comment_isMine
        FROM comment c join user u on c.user_id = u.id
        WHERE c.post_id = ?`,
    getRepyl: `
        SELECT
            r.id as reply_id,
            u.id as reply_user_id,
            u.name as reply_user_name,
            u.icon_url as reply_user_icon_url,
            r.body as reply_body,
            r.created_at as reply_date,
            r.comment_id as commented_id,
            CASE 
                WHEN u.id = ? THEN true
                ELSE false
            END AS reply_isMine
        FROM reply r join user u on r.user_id = u.id
        WHERE r.post_id = ?`,
    getLikeCount: `
        SELECT COUNT(*) as like_count
        FROM post_like
        WHERE post_id = ?`,
    getHasliked: `
        SELECT EXISTS (SELECT 1 FROM post_like WHERE post_id =? AND user_id =?) as ex`


};
