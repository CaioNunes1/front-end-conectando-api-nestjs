import axios from 'axios';
const api = axios.create({
    baseURL: 'https://learning-api-nestjs.vercel.app/',
    //baseURL: 'http://localhost:3333/',
    withCredentials: true,
});

export default api;