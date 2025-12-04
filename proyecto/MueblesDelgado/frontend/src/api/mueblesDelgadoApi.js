import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const mueblesDelgadoApi = axios.create({
    baseURL: VITE_API_URL
});

// Interceptor: Antes de cada petición, pegamos el token
mueblesDelgadoApi.interceptors.request.use( config => {

    const token = localStorage.getItem('token');
    
    if(token) {
        // Tu backend espera 'x-token' para renovar, y a veces Authorization.
        // Lo más seguro es mandar ambos o estandarizar. 
        // Basado en tu controlador /renew, usas x-token.
        config.headers = {
            ...config.headers,
            'x-token': token 
        }
    }

    return config;
});

export default mueblesDelgadoApi;