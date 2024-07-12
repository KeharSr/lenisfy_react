

import React, { useState, useEffect } from 'react';
import { getCartApi } from '../../apis/Api';
import Navbar from '../../components/navbar/Navbar';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200 && res.data && res.data.products) {
        const cartItems = res.data.products.map(item => ({
          ...item,
          quantity: item.quantity 
        }));
        setCart(cartItems);
        calculateSubtotal(cartItems);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    if (newQuantity > cart[index].productId.productQuantity) {
      toast.error("Out of Stock");
      return;
    }

    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
    calculateSubtotal(newCart);
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.productId.productPrice * item.quantity), 0);
    setSubtotal(total);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-orange-50">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">Your cart is empty.</div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-4">
            {cart.map((item, index) => (
              <div key={item._id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img
                    src={`http://localhost:5000/products/${item.productId.productImage}`}
                    alt={item.productId.productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h5 className="text-lg font-bold">{item.productId.productName}</h5>
                    <p className="text-gray-500 pt-1">Price: Rs. {item.productId.productPrice}</p>
                    <p className="text-gray-500 pt-1">Description: {item.productId.productDescription}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(index, e.target.value)}
                    className="w-16 text-center border-gray-300 rounded-md"
                  />
                  <span>Rs. {(item.productId.productPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <button className="mt-4 bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition-colors duration-300">
                Proceed to Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;


