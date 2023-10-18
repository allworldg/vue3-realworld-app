import axios, { AxiosInstance } from 'axios'

const service: AxiosInstance = axios.create({
    baseURL: "https://api.realworld.io/api/",
    "timeout": 5000
})
service.interceptors.request.use(config => {
    return config
})

export default service