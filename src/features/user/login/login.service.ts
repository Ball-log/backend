import { sign, refresh } from "./../../../../utils/jwt.utils";
import redisCl from "../../../../utils/redis";
import { req_login } from "../../../interface/user/login.interface";

export const PostLoginService = async (req: req_login) => {
    const success = true;
    const user = req;
    console.log(user);
    if (success) {
        const accessToken = sign(user);
        const refreshToken = refresh();
        redisCl.set(user.email, refreshToken);

        return {
            ok: true,
            data: {
                accessToken,
                refreshToken
            }
        };
    } else {
        return {
            ok: false,
            message: "password is incorrect"
        };
    }
};

export const GetLoginService = async (req: req_login) => {
    console.log(req);
    return "test";
};
