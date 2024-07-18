import App from "./app";
import { initPool } from "./../config/db.pool";
import { config } from "dotenv";

config();
initPool();

const app = App();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

