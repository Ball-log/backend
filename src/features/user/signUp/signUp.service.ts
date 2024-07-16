import { req_signUp } from "../../../models/user/signUp/signUp.dto";
import { PostSignUpDao } from "../../../models/user/signUp/signUp.dao";

export const PostSignUpService = async (req: req_signUp) => {
    const result = await PostSignUpDao(req);
    return result;
};
