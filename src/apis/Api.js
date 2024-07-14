import axios from "axios";

// Creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

const config = {
    headers: {
        
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
// Test API 
export const testApi = () => Api.get('/test')


// Register Api

export const registerUserApi = (data) => Api.post('/api/user/create', data)



// Login Api
export const loginUserApi = (data) => Api.post('/api/user/login', data)


// Create Product Api
export const createProductApi = (data) => Api.post('/api/product/create', data)

// Get All Products Api
export const getAllProductsApi = () => Api.get('/api/product/get_all_products',config)


// Update Product Api
export const updateProduct = (id,data) => Api.put(`/api/product/update_product/${id}`,data,config)

//delete product api
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`,config)

// Get Single Product Api
export const getSingleProductApi = (id) => Api.get(`/api/product/get_single_product/${id}`,config)



// Get Products By Category Api
export const getProductsByCategoryApi = (category) => Api.get(`/api/product/get_products_by_category?category=${category}`,config)

// Add to Cart Api
export const addToCartApi = (data) => Api.post('/api/cart/add_to_cart', data,config)


export const getCartApi = () => Api.get('/api/cart/get_cart',config)

//place order api
export const placeOrderApi = (data) => Api.post('/api/order/place_order',data,config)



