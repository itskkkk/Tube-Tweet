import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL : "https://backend-project-t25d.onrender.com/api/v1",
    withCredentials : true,
})