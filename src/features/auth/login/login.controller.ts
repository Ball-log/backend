import { Request, Response } from "express";
import { getLoginService } from "./login.service";


export const getLoginController = async (req: Request, res: Response) => {

    const result = await getLoginService(res.locals.id);
    res.set("Authorization", `Bearer ${result[0]}`);
    res.set("RefreshToken", result[1]);
    res.send("ok");
};

