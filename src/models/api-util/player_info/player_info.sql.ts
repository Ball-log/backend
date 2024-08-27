export const player_infoSql = {
    get: 
        `SELECT
            p.id as player_id,
            p.name as player_name,
            p.number as player_number,
            p.position as player_position,
            p.profile_img as player_profile_img,
            p.team_id as player_team_id,
            t.name as player_team_name
        FROM matchinfo m
            JOIN team t
                ON (m.home_team_id = t.id OR m.away_team_id = t.id)
            JOIN player p
                ON p.team_id = t.id  -- 플레이어의 팀 아이디가 팀 아이디와 일치하는 경우
        WHERE m.id = ?;
        `
}