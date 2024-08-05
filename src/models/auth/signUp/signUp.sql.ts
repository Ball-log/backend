
export const getSignUpSql = "insert into user (id, email, name, icon_url) values (?, ?, ?, ?)";
export const checkEmailSql = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";


