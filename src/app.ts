import express from "express";
import { healthRoute } from "./routes/health/health.route";
import cors from "cors";
import asyncHandler from "express-async-handler";
import { config } from "dotenv";

import { specs } from "../config/swagger.config";
import SwaggerUi from "swagger-ui-express";


import { authRouter } from "./routes/auth/auth.routes";
import { api_utilsRouter } from "./routes/api-util/api-util.route";
import { communityRouter } from "./routes/community/community.routes";
import { myPageRouter } from "./routes/myPage/myPage.route";

import { authAccessTokenMiddleware } from "./utils/jwt.middleware";
import { boardRouter } from "./routes/board/board.route";

config();

export default function App() {
    const app = express();
    app.use(cors()); // cors 방식 허용
    app.use(express.static("public")); // 정적 파일 접근
    app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
        res.send(process.env.PORT);
    });
    app.use("/health", healthRoute);

    // swagger
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

    app.use("/auth", asyncHandler(authRouter));
    app.use(
        "/myPage",
        asyncHandler(authAccessTokenMiddleware),
        asyncHandler(myPageRouter)
    );
    app.use(
        "/community",
        asyncHandler(authAccessTokenMiddleware),
        asyncHandler(communityRouter)
    );
    app.use(
        "/board",
        asyncHandler(authAccessTokenMiddleware),
        asyncHandler(boardRouter)
    );
    app.use(
        "/api-utils",
        asyncHandler(authAccessTokenMiddleware),
        asyncHandler(api_utilsRouter)
    );

    return app;
}
