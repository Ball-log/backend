export const postSignUpSql = "insert into user (email, password, team_id) values (?, ?, ?)";
export const checkEmailSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";
