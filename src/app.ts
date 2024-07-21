
import express, { json, urlencoded } from "express";

import { authRouter } from "./routes/auth/auth.routes";

import { config } from "dotenv";

config();
export default function App() {
    const app = express();

    app.get("/login", (req, res) => {
        res.send(`
        <h1>Log in</h1>
        <a href="/login/google">google Log in</a>
        <a href="/login/kakao">kakao Log in</a>
        `);
    });
    app.get("/signUp", (req, res) => {
        res.send(`
        <h1>Sign up</h1>
        <a href="/signUp/google">google Sign up</a>
        <a href="/signUp/kakao">kakao Sign pp</a>
        `);
    });

    app.get("/login/google", (req, res) => {
        let url = "https://accounts.google.com/o/oauth2/v2/auth";
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
        url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_LOGIN}`;
        url += "&response_type=code";
        url += "&scope=email profile";
        res.redirect(url);
    });
    app.get("/signUp/google", (req, res) => {
        let url = "https://accounts.google.com/o/oauth2/v2/auth";
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
        url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_SIGN_UP}`;
        url += "&response_type=code";
        url += "&scope=email profile";
        res.redirect(url);
    });
    app.get("/login/kakao", (req, res) => {
        let url = "https://kauth.kakao.com/oauth/authorize";
        url += `?client_id=${process.env.KAKAO_CLIENT_ID}`;
        url += `&redirect_uri=${process.env.KAKAO_REDIRECT_URI_LOGIN}`;
        url += "&response_type=code";
        res.redirect(url);
    });


    app.get("/signUp/kakao", (req, res) => {
        let url = "https://kauth.kakao.com/oauth/authorize";
        url += `?client_id=${process.env.KAKAO_CLIENT_ID}`;
        url += `&redirect_uri=${process.env.KAKAO_REDIRECT_URI_SIGN_UP}`;
        url += "&response_type=code";
        res.redirect(url);
    });

    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use("/auth", authRouter);
    return app;
}
