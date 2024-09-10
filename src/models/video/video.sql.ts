export const videoSql = {
    post: "INSERT INTO video (title, video_url, user_id, user_id)",
    patch: "UPDATE video SET video_url = ? and title = ? WHERE id = ?",
    delete: "DELETE FROM video WHERE id = ?",
    get: 
        `
        SELECT 
            
        FROM video
        `
};
