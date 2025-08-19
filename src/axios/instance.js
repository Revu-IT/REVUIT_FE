import axios from "axios";

const api = axios.create({
    baseURL: "15.165.84.55",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
