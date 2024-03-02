import dotenv from "dotenv";
dotenv.config();

const env = {
    port: process.env.PORT,
    host: "database-lks.cxysa6ueqoz3.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "admin123",
    database: "film",
};

export default env;
