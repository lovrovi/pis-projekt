import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5000/api"
})

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default instance