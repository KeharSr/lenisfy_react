import axios from "axios";

// Creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

// Test API 
export const testApi = () => Api.get('/test')


// Register Api

export const registerUserApi = (data) => Api.post('/api/user/create', data)

// Login Api
export const loginUserApi = (data) => Api.post('/api/user/login', data)


// Create Product Api
export const createProductApi = (data) => Api.post('/api/product/create', data)


