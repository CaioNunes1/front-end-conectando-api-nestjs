import axios from 'axios';
const api = axios.create({
    //baseURL: 'https://api.saganufrpe.tech/',
    baseURL: 'http://localhost:3333/',
    withCredentials: true,
});

export default api;