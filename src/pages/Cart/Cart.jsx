import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCartApi } from '../../apis/Api';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    getCartApi().then(res => {
      if (res.status === 200) {
        setCart(res.data.cart);
      }
    }).catch(err => {
      console.log(err);
    });
    
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map(item => (
            <div key={item._id} className="border rounded-lg p-4 shadow-lg">
              <div className="w-full h-52 overflow-auto">
                <img
                  src={`http://localhost:5000/products/${item.productImage}`}
                  className="w-full h-full object-cover"
                  alt={item.productName}
                />
              </div>
              <h5 className="text-lg font-bold mb-1">{item.productName}</h5>
              <div className="text-red-500 text-md mb-2">{item.productPrice}</div>
              <p className="text-sm text-gray-600 mb-5">{item.productDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;


