import axios from "axios";
import env from "../utils/environment";

const serviceAxios = axios.create({
    baseURL: env.api_url,
});

export default serviceAxios;
