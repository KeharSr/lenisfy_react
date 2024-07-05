import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProductApi, addToCartApi } from '../../apis/Api';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isOutStock, setIsOutStock] = useState(false);

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        if (res.status === 201) {
          setProduct(res.data.product);
          updateStockStatus(res.data.product, quantity);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Function to check stock based on product and quantity
  const updateStockStatus = (product, quantity) => {
    if (product.productQuantity < quantity) {
      setError("Out of Stock");
      setIsOutStock(true);
    } else {
      setError("");
      setIsOutStock(false);
    }
  };

  // Handle quantity change with stock condition
  const handleQuantityChange = (newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity > quantity && isOutStock) {
      // Prevent increasing quantity if out of stock
      return;
    }
    setQuantity(newQuantity);
    if (product) {
      updateStockStatus(product, newQuantity);
    }
  };

  const addToCart = () => {
    if (!isOutStock && product && quantity > 0) {
      addToCartApi({ productId: product._id, }).then((res) => {
        if (res.status === 201) {
          toast.success('Product added to cart');
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Failed to add to cart');
      });
    }
  };

  const buyNow = () => {
    addToCart();
    // Redirect to cart or checkout page
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <img src={`http://localhost:5000/products/${product.productImage}`}
          alt={product.productName}
          className="w-full h-96 object-cover rounded-md" />
        <div className="flex mt-4 space-x-2">
          {product.additionalImages && product.additionalImages.map((img, index) => (
            <img key={index} src={`http://localhost:5000/products/${img}`}
              alt={`Additional ${index}`}
              className="w-20 h-20 object-cover rounded-md cursor-pointer" />
          ))}
        </div>
      </div>
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
        <div className="flex items-center mb-2">
          <span className="text-blue-500 mr-2">Visit Store</span>
          <span className="text-yellow-500 mr-2">★ {product.rating}</span>
          <span className="text-gray-500">({product.reviews} reviews)</span>
        </div>
        <div className="text-2xl text-red-600 mb-4">${product.productPrice.toFixed(2)}</div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">About This Item:</h2>
          <p className="text-gray-700 mb-4">{product.productDescription}</p>
          <ul className="text-gray-700 mb-4">
            <li>Color: {product.color}</li>
            <li>Available: {product.productQuantity}</li>
            <li>Category: {product.productCategory}</li>
          </ul>
        </div>
        {isOutStock && <div className="text-red-500 text-2xl">{error}</div>}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" id="quantity" name="quantity" value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            min="1" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
        </div>
        <div className="flex gap-4 mb-4">
          <button onClick={() => addToCart(product._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-blue-600 transition-colors duration-200">
            Add to Cart
          </button>
          <button onClick={buyNow}
            className="bg-green-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-green-600 transition-colors duration-200">
            Buy Now
          </button>
        </div>
        <div className="flex items-center mt-4">
          <span className="mr-4">Share At:</span>
          <div className="flex space-x-2">
            <i className="fab fa-facebook-f text-blue-700 cursor-pointer"></i>
            <i className="fab fa-twitter text-blue-400 cursor-pointer"></i>
            <i className="fab fa-instagram text-pink-500 cursor-pointer"></i>
            <i className="fab fa-linkedin-in text-blue-600 cursor-pointer"></i>
            <i className="fab fa-pinterest text-red-700 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
