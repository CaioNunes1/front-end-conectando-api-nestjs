import axios from 'axios';
const api = axios.create({
    baseURL: 'https://cadastro-front-end-com-backend-nestjs.netlify.app/',
    //baseURL: 'http://localhost:3333/',
    withCredentials: true,
});

export default api;