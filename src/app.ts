import express, { json, urlencoded } from "express";
import { authRouter } from "./routes/auth/auth.routes";
import { config } from "dotenv";
import cors from "cors";
import { myPageRouter } from "./routes/myPage/myPage.route";
import asyncHandler from "express-async-handler";
import { authAccessTokenMiddleware } from "./utils/jwt.middleware";

import { communityRouter } from "./routes/community/community.routes";

import { specs } from "../config/swagger.config";
import SwaggerUi from "swagger-ui-express";
import { api_utilsRouter } from "./routes/api-util/api-util.route";
import { ebHealthRouter } from "./routes/eb_health/eb_health.route";

config();
export default function App() {
    const app = express();
    app.use(cors());
    app.get("/auth/login", (req, res) => {
        res.send(`
        <h1>Log in</h1>
        <a href="/auth/login/google">google Log in</a>
        <a href="/auth/login/kakao">kakao Log in</a>
        <a href="/auth/login/naver">naver Log in</a>
        `);
    });
    app.get("/auth/signUp", (req, res) => {
        res.send(`
        <h1>Sign up</h1>
        <a href="/auth/signUp/google">google Sign up</a>
        <a href="/auth/signUp/kakao">kakao Sign pp</a>
        <a href="/auth/signUp/naver">naver Sign pp</a>
        `);
    });

    // swagger
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use("/auth", asyncHandler(authRouter));
    app.use(
        "/myPage",
        asyncHandler(authAccessTokenMiddleware),
        asyncHandler(myPageRouter)
    );
    app.use("/community", asyncHandler(authAccessTokenMiddleware), communityRouter);
    app.use("/api-utils", asyncHandler(authAccessTokenMiddleware), api_utilsRouter);
    app.use("/health", ebHealthRouter)
    return app;
}
