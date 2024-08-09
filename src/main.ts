import App from "./app";
import { initPool } from "./../config/db.pool";
import { config } from "dotenv";

config();
initPool();

const app = App();
<<<<<<< HEAD

app.listen(3001, () => {
=======
app.listen(3000, () => {
>>>>>>> db83157f055ddb799377da0a3f4366fd96282d8c
    console.log("Server is running on port 3000 test");
});
