export const postSql = {
    postBlog: "INSERT INTO blog(title, body, thumbnail_url, user_id) VALUES (?, ?, ?, ?)",
    postImg: "INSERT INTO image (url, post_id, post_type) VALUES (?, ?, ?)",
    postMvp: "INSERT INTO mvp (player_id, player_record, thumbnail_url, user_id) VALUES (?, ?, ?, ?)",
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
