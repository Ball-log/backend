export const post_likeSql = {
    post: "INSERT INTO post_like (post_id, user_id, post_type) VALUES (?, ?, ?)",
    delete: "DELETE FROM post_like WHERE user_id =? AND post_id =?"
};
