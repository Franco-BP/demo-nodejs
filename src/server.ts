import app from "./app";
import config from "./config/config";
import { connectDB, sequelize } from "./config/database";
import { initRegisterModel } from "./models/register";

app.listen(config.port, () => {
    connectDB();

    initRegisterModel(sequelize);

    console.log(`Server running on port: ${config.port}`)
});