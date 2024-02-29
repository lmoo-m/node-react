import { Router } from "express";
import multer from "multer";
import {
    addFilm,
    deleteFilm,
    editFilm,
    getFilm,
    getFilmById,
} from "../controllers/filmController.js";

const route = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${Math.floor(Math.random() * 999)}-${
                file.originalname
            }`
        );
    },
});

const image = multer({
    storage,
});

route.get("/film", getFilm);
route.get("/film/:id", getFilmById);
route.post("/film", image.single("cover"), addFilm);
route.patch("/film/:id", editFilm);
route.delete("/film/:id", deleteFilm);

export default route;
