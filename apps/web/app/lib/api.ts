import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000", // Auth service
    withCredentials: true,            // So cookies are sent
});

export default api;
