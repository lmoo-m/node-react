import { Router } from "express";
import image from "../libs/multer/multerService.js";
import {
    addFilm,
    deleteFilm,
    editFilm,
    getFilm,
    getFilmById,
} from "../controllers/filmController.js";

const route = Router();

route.get("/film", getFilm);
route.get("/film/:id", getFilmById);
route.post("/film", image.single("cover"), addFilm);
route.patch("/film/:id", editFilm);
route.delete("/film/:id", deleteFilm);

export default route;
