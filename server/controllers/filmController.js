import film from "../models/filmModel.js";
import response from "../utils/response/response.js";

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

        const result = await film.create({
            title,
            director,
            release_date,
            language,
            distributor,
            cover: image.filename,
        });

        return response(res, true, "film berhasil ditambahkan", result);
    } catch (error) {
        console.log("server error:", error);
    }
};

export const editFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, director, release_date, language, distributor, cover } =
            req.body;

        const selectFilm = await film.findOne({ where: { id } });

        if (!selectFilm) {
            return response(res, false, "film tidak ditemukan");
        }

        if (!(title, director, release_date, language, distributor, cover)) {
            return response(res, false, "wajib mengisi semua field");
        }

        const result = await selectFilm.update({
            title,
            director,
            release_date,
            language,
            distributor,
            cover,
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

        const result = await selectFilm.destroy();
        return response(res, true, "data film berhasil dihapus", result);
    } catch (error) {
        console.log(error);
    }
};
