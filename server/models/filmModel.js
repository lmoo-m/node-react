import { DataTypes } from "sequelize";
import database from "../config/database.js";

const film = database.define(
    "film",
    {
        title: DataTypes.STRING,
        director: DataTypes.STRING,
        release_date: DataTypes.STRING,
        language: DataTypes.STRING,
        distributor: DataTypes.STRING,
        cover: DataTypes.STRING,
    },
    {
        freezeTableName: false,
    }
);

export default film;
