import express from "express";
import { healthRoute } from "./health.route";
import cors from "cors";
import asyncHandler from "express-async-handler";


import { specs } from "../config/swagger.config";
import SwaggerUi from "swagger-ui-express";

/*
import { config } from "dotenv";
import { authRouter } from "./routes/auth/auth.routes";

import { communityRouter } from "./routes/community/community.routes";
import { myPageRouter } from "./routes/myPage/myPage.route";
config();
*/
import { authAccessTokenMiddleware } from "./utils/jwt.middleware";
import { api_utilsRouter } from "./routes/api-util/api-util.route";

export default function App() {
    const app = express();
    app.use(cors());                            // cors 방식 허용
    app.use(express.static("public"));          // 정적 파일 접근
    app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
        res.send("루트 페이지!");
    });

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

    app.use("/health", healthRoute);


    // swagger
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

    /*
    app.use("/auth", asyncHandler(authRouter));
    app.use(
        "/myPage",
        asyncHandler(authAccessTokenMiddleware),
        asyncHandler(myPageRouter)
    );
    app.use("/community", asyncHandler(authAccessTokenMiddleware), communityRouter);
    */
    app.use("/api-utils", asyncHandler(authAccessTokenMiddleware), api_utilsRouter);

    return app;
}
