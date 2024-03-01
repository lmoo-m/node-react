import serviceAxios from "../axiosService";

export const getFilm = async () => {
    const data = await serviceAxios.get("/film");
    return data;
};

export const getFilmById = async (id) => {
    const data = await serviceAxios.get(`/film/${id}`);
    return data;
};

export const postFilm = async (data) => {
    const result = await serviceAxios.post("/film", data);
    return result;
};

export const editFilm = async (id, data) => {
    const result = await serviceAxios.patch(`/film/${id}`, data);
    return result;
};

export const deleteFilm = async (id) => {
    const data = await serviceAxios.delete(`/film/${id}`);
    return data;
};
