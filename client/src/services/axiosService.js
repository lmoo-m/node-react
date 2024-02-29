import axios from "axios";

const serviceAxios = axios.create({
    baseURL: "http://localhost:3001",
});

export default serviceAxios;
