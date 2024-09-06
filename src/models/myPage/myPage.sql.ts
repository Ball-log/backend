export const myPageSql = {
    getSql:
        `WITH USER_TEAM AS (
    SELECT 
        u.team_id, 
        t.icon_round AS team_icon_round, 
        u.profile_background_img_url AS user_background_img,
        u.icon_url AS user_icon_url,
        u.name AS user_name
    FROM user u
    JOIN team t ON u.team_id = t.id
    WHERE u.id = ?
),
MATCH_INFO AS (
    SELECT 
        m.match_date,
        m.home_team_id,
        m.away_team_id,
        m.home_team_score,
        m.away_team_score,
        m.id,
        m.note,
        ht.icon_flag AS home_team_icon_flag,
        at.icon_flag AS away_team_icon_flag
    FROM matchinfo m
    LEFT JOIN team ht ON m.home_team_id = ht.id
    LEFT JOIN team at ON m.away_team_id = at.id
    WHERE DATE(m.match_date) = DATE(NOW())
),
MATCH_AND_CONTENT AS (
    SELECT 
        ut.team_id, 
        ut.team_icon_round, 
        ut.user_background_img, 
        ut.user_name,
        ut.user_icon_url,
        mi.match_date,
        mi.id,
        mi.note,
        CASE 
            WHEN ut.team_id = mi.home_team_id THEN mi.home_team_score 
            ELSE mi.away_team_score 
        END AS user_team_score,
        CASE 
            WHEN ut.team_id = mi.home_team_id THEN mi.home_team_icon_flag 
            ELSE mi.away_team_icon_flag
        END AS user_team_icon_flag,
        CASE 
            WHEN ut.team_id = mi.home_team_id THEN mi.away_team_icon_flag 
            ELSE mi.home_team_icon_flag 
        END AS opposition_team_icon_flag,
        CASE 
            WHEN ut.team_id = mi.home_team_id THEN mi.away_team_score 
            ELSE mi.home_team_score 
        END AS opposition_team_score
    FROM USER_TEAM ut
    LEFT JOIN MATCH_INFO mi ON ut.team_id = mi.home_team_id OR ut.team_id = mi.away_team_id
),
USER_CONTENT AS (
    SELECT 
        DATE(created_at) AS writed_date_list
    FROM blog
    WHERE user_id = ?
    UNION
    SELECT 
        DATE(created_at) AS writed_date_list
    FROM mvp
    WHERE user_id = ?
)
SELECT 
    mac.team_id,
    mac.team_icon_round,
    mac.user_background_img,
    mac.user_name,
    mac.user_icon_url,
    mac.id as match_id,
    mac.note as match_state,
    mac.match_date,
    mac.user_team_score,
    mac.user_team_icon_flag,
    mac.opposition_team_icon_flag,
    mac.opposition_team_score,
    uc.writed_date_list
FROM MATCH_AND_CONTENT mac
LEFT JOIN USER_CONTENT uc ON uc.writed_date_list IS NOT NULL`
};
