export const settingSql = {
    getSettingSql:
        `SELECT
            user.id AS user_id,
            user.profile_img_url AS user_icon,
            user.name AS user_name,
            team.id AS team_id,
            team.name AS team_name,
            team.icon_flag AS team_icon_flag
        FROM
            user
        CROSS JOIN
            team
        WHERE
            user.id = ?`

};
