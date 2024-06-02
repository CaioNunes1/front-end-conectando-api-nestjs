import axios from 'axios';
const api = axios.create({
    //baseURL: 'https://web-production-c1d5.up.railway.app/',
    baseURL: 'http://localhost:3333/',
    withCredentials: true,
});

export default api;