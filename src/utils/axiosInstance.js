import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL : "https://backend-project-4hkf.onrender.com/api/v1",
    withCredentials : true,
})