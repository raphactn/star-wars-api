import axios from "axios";

const api = axios.create({
    baseURL: 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api'
});

export default api;