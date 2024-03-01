import { deleteImage, sendImage } from "../libs/s3/s3Service.js";
import film from "../models/filmModel.js";
import response from "../utils/response/response.js";
import { v4 as uuid } from "uuid";

export const getFilm = async (req, res) => {
    try {
        const data = await film.findAll();

        if (data.length === 0) {
            return response(res, false, "belum ada data disini");
        }
        return response(res, true, "berhasil ambil semua data film", data);
    } catch (error) {
        console.log("server error:", error);
    }
};

export const getFilmById = async (req, res) => {
    try {
        const { id } = req.params;
        const selectFilm = await film.findOne({ where: { id } });

        if (!selectFilm) {
            return response(res, false, "film tidak ditemukan");
        }

        return response(res, true, "berhasil ambil data film", selectFilm);
    } catch (error) {
        console.log("server error:", error);
    }
};

export const addFilm = async (req, res) => {
    try {
        const { title, director, release_date, language, distributor } =
            req.body;

        const image = req.file;

        if (!(title, director, release_date, language, distributor)) {
            return response(res, false, "wajib mengisi semua field");
        }
        const nameImage = uuid() + image.originalname;

        const resa = await sendImage("testanod", nameImage, image);
        console.log(resa.RequestCharged);

        const result = await film.create({
            title,
            director,
            release_date,
            language,
            distributor,
            cover: nameImage,
        });

        return response(res, true, "film berhasil ditambahkan", result);
    } catch (error) {
        console.log("server error:", error);
    }
};

export const editFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, director, release_date, language, distributor } =
            req.body;

        const selectFilm = await film.findOne({ where: { id } });

        if (!selectFilm) {
            return response(res, false, "film tidak ditemukan");
        }

        // if (!(title, director, release_date, language, distributor)) {
        //     return response(res, false, "wajib mengisi semua field");
        // }

        const image = req.file;
        if (image) {
            const nameImage = uuid() + image.originalname;
            await sendImage("testanod", nameImage, image);
            await deleteImage("testanod", selectFilm.cover);
            const result = await selectFilm.update({
                title,
                director,
                release_date,
                language,
                distributor,
                cover: nameImage,
            });
            return response(res, true, "film berhasil diedit", result);
        }

        const result = await selectFilm.update({
            title,
            director,
            release_date,
            language,
            distributor,
        });

        return response(res, true, "film berhasil diedit", result);
    } catch (error) {
        console.log("server error:", error);
    }
};

export const deleteFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const selectFilm = await film.findOne({ where: { id } });

        if (!selectFilm) {
            return response(res, false, "film tidak ditemukan");
        }
        const s3res = await deleteImage("testanod", selectFilm.cover);
        console.log(s3res);

        const result = await selectFilm.destroy();
        return response(res, true, "data film berhasil dihapus", result);
    } catch (error) {
        console.log(error);
    }
};
