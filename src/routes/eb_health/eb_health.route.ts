import Router from "express";

const ebHealthRouter = Router()

export const healthController = (req, res, next) => {
    res.send("HELLO, I'm Healthy!");
};

ebHealthRouter.get('/', healthController)