
import express, { json, urlencoded } from "express";

import { UserRouter } from "./routes/user/user.routes";
import { authRouter } from "./routes/auth/auth.routes";
export default function App() {
    const app = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use("/user", UserRouter);
    app.use("/auth", authRouter);
    return app;
}
