import { Sequelize } from "sequelize";
import env from "../utils/environment/env.js";

const database = new Sequelize({
    database: env.database,
    username: env.user,
    password: env.password,
    host: env.host,
    dialect: "mysql",
});

export default database;
