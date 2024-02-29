import express from "express";
import cors from "cors";

import env from "./utils/environment/env.js";
import database from "./config/database.js";
import film from "./models/filmModel.js";
import route from "./routes/route.js";

const app = express();

try {
    database.authenticate();
    film.sync();
    console.log("connected database...");
} catch (error) {
    console.log(error);
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(route);

app.listen(env.port, () => console.log("running in port", env.port));
