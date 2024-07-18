export const postLoginSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ? and password = ?) as isExistEmail";
