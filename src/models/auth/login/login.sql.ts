export const postLoginSql = "SELECT EXISTS(SELECT 1 FROM user WHERE id = ?) as isExistEmail";
