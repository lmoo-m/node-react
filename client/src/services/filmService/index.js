import serviceAxios from "../axiosService";

export const getFilm = async () => {
    const data = await serviceAxios.get("/film");
    return data;
};

export const getFilmById = async (id) => {
    const data = await serviceAxios.get(`/film/${id}`);
    return data;
};

export const deleteFilm = async (id) => {
    const data = await serviceAxios.delete(`/film/${id}`);
    return data;
};
