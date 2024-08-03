
import express, { json, urlencoded } from "express";
import { authRouter } from "./routes/auth/auth.routes";
import { config } from "dotenv";
import { myPageRouter } from "./routes/myPage/myPage.route";
import asyncHandler from "express-async-handler";
import { authAccessTokenMiddleware } from "./utils/jwt.middleware";
config();
export default function App() {
    const app = express();

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

    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use("/auth", asyncHandler(authRouter));
    app.use("/myPage", asyncHandler(authAccessTokenMiddleware), asyncHandler(myPageRouter));
    return app;
}
