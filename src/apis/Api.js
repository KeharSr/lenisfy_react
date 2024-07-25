import axios from "axios";

// Creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})


const config2 = {
    headers: {
        
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}


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

//Upload Profile Picture Api
export const uploadProfilePictureApi = (data) => Api.post('/api/user/profile_picture', data,config)


// get current user api
export const getCurrentUserApi = () => Api.get('/api/user/current',config)


// Create Product Api
export const createProductApi = (data) => Api.post('/api/product/create', data)

// Get All Products Api
export const getAllProductsApi = () => Api.get('/api/product/get_all_products',config)


// Update Product Api
export const updateProduct = (id,data) => Api.put(`/api/product/update_product/${id}`,data,config)

//delete product api
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, config)

// Get Single Product Api
export const getSingleProductApi = (id) => Api.get(`/api/product/get_single_product/${id}`,config)



// // Get Products By Category Api
// export const getProductsByCategoryApi = (category) => Api.get(`/api/product/get_products_by_category?category=${category}`,config)

// Get Products By Category including pagination
export const getProductsByCategoryApi = (category, page, limit=2 ) =>  Api.get(`/api/product/get_products_by_category?category=${category}&page=${page}&limit=${limit}`, config)
  
  


// Add to Cart Api
export const addToCartApi = (data) => Api.post('/api/cart/add_to_cart', data,config)


export const getCartApi = () => Api.get('/api/cart/get_cart',config)

// delete cart item api
export const deleteCartItemApi = (id) => Api.delete(`/api/cart/remove_cart_item/${id}`,config)

export const updateStatusApi = () => Api.put(`/api/cart/update_status`,'',config)

//place order api
export const placeOrderApi = (data) => Api.post('/api/order/place_order',data,config2)

// get single order api
export const getSingleOrderApi = (id) => Api.get(`/api/order/get_single_order/${id}`,config)

// get all orders api
export const getAllOrdersApi = () => Api.get('/api/order/get_all_orders',config)

// order status update api
export const updateOrderStatusApi = (id,data) => Api.post(`/api/order/update_order_status/${id}`,data,config2)

//forgot password
export const forgotPasswordApi = (data) =>
  Api.post('/api/user/forgot_password', data);

// verify otp
export const verifyOtpApi = (data) => Api.post('/api/user/verify_otp', data);

// add review api
export const addReviewApi = (data) => Api.post('/api/review/post_reviews', data,config)

// get reviews api
export const getReviewsApi = (ProductId) => Api.get(`/api/review/get_reviews/${ProductId}`,config)

// get reviews by product and user api
export const getReviewsByProductAndUserApi = (ProductId) => Api.get(`/api/review/get_reviews_by_user_and_product/${ProductId}`,config) 

// get average rating api
export const getAverageRatingApi = (ProductId) => Api.get(`/api/review/get_average_rating/${ProductId}`,config)

//update review api
export const updateReviewApi = (id,data) => Api.put(`/api/review/update_reviews/${id}`,data,config)





