export const PostSignUpSql = "insert into user (email, password, team_id) values (?, ?, ?)";
export const CheckEmailSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";
