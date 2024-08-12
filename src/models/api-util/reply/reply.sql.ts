export const replySql = {
    post: "INSERT INTO reply (body, post_id, user_id, comment_id, post_type) VALUES(?, ?, ?, ?, ?)",
    patch: "UPDATE reply SET body = ? WHERE id = ? and user_id = ?",
    delete: "DELETE FROM reply WHERE id =? and user_id =?"
};
