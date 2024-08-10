import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import { specs } from "../config/swagger.config";
import SwaggerUi from "swagger-ui-express";

import { communityRouter } from "./routes/community/community.routes";
import { authRouter } from "./routes/auth/auth.routes";
import { myPageRouter } from "./routes/myPage/myPage.route";
import { healthRoute } from "./routes/health/health.route";
import { api_utilsRouter } from "./routes/api-util/api-util.route";
import { authAccessTokenMiddleware } from "./utils/jwt.middleware";

export default function App() {
    const app = express();
    app.use(cors());                            // cors 방식 허용
    app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => { res.send("https://api.ballog.store"); });

    // swagger
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));
    app.use("/health", healthRoute);
    app.use("/auth", asyncHandler(authRouter));
    app.use("/myPage", asyncHandler(authAccessTokenMiddleware), asyncHandler(myPageRouter));
    app.use("/community", asyncHandler(authAccessTokenMiddleware), communityRouter);
    app.use("/api-utils", asyncHandler(authAccessTokenMiddleware), api_utilsRouter);
    return app;
}
