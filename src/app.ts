
import express, { json, urlencoded } from "express";

export default function App() {
    const app = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));

    return app;
}
