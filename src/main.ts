import App from "./app";
import { initPool } from "./../config/db.pool";
import { config } from "dotenv";
import { setupSocketIO } from "./utils/socket.middleware";



config();
initPool();

const app = App();
const server = app.listen(3000, () => {
    console.log("Server is running on port 3000 test");
});
setupSocketIO(server);
