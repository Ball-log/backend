import App from "./app";
import { config } from "dotenv";

config();

const app = App();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
