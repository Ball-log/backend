export const postSignUpSql = "insert into user (id, email, name) values (?, ?, ?)";
export const checkEmailSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";
