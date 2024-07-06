


import React, { useState, useEffect } from 'react';
import { getCartApi } from '../../apis/Api';
import Navbar from '../../components/navbar/Navbar';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200 && res.data && res.data.products) {
        // Initialize each product with a quantity for local state management
        const cartItems = res.data.products.map(item => ({
          ...item,
          quantity: item.productId.productQuantity
        }));
        setCart(cartItems);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    // Ensure quantity is a positive number
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    // Check if the requested quantity exceeds the available stock
    if (newQuantity > cart[index].productId.productQuantity) {
      toast.error("Out of Stock");
      // Optionally reset the quantity input to the max available quantity or leave it as the user's input
      // newCart[index].quantity = cart[index].productId.productQuantity;
      return;
    }

    // Update the cart with the new quantity if it's within the available stock
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
};


  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Product</th>
                <th className="px-4 py-2 text-left text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-gray-600">Quantity</th>
                <th className="px-4 py-2 text-left text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`http://localhost:5000/products/${item.productId.productImage}`}
                        alt={item.productId.productName}
                        className="w-20 h-20 object-cover"
                      />
                      <span>{item.productId.productName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">${item.productId.productPrice}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => handleQuantityChange(index, parseInt(e.target.value))}
                      className="w-20 text-center border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">${(item.productId.productPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Cart;
