export const matchInfoSql = {
    get:
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
    WHERE Date(m.match_date) = ? `
}