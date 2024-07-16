
import express, { json, urlencoded } from "express";

import { UserRouter } from "./routes/user/user.routes";

export default function App() {
    const app = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use("/user", UserRouter);
    return app;
}
