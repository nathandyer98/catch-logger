import axios from "axios"

export default axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api",
})