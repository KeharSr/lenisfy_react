// import React, { useState } from 'react';

// const Addtocart = () => {
//   const [cart, setCart] = useState([
//     { id: 1, name: 'Product 1', price: 1200, quantity: 1, imageUrl: 'https://via.placeholder.com/100' },
//     { id: 2, name: 'Product 2', price: 1200, quantity: 1, imageUrl: 'https://via.placeholder.com/100' },
//   ]);

//   const increaseQuantity = (productId) => {
//     setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
//   };

//   const decreaseQuantity = (productId) => {
//     setCart(cart.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
//   };

//   const removeItem = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
//       <div className="space-y-6">
//         {cart.map((product) => (
//           <div key={product.id} className="flex items-center justify-between border-b pb-4">
//             <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded" />
//             <div className="flex-1 ml-4">
//               <h2 className="text-xl font-semibold">{product.name}</h2>
//               <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//               <div className="mt-2 flex items-center">
//                 <span className="mr-2">Quantity:</span>
//                 <button className="px-2 py-1 border" onClick={() => decreaseQuantity(product.id)}>-</button>
//                 <span className="mx-2">{product.quantity}</span>
//                 <button className="px-2 py-1 border" onClick={() => increaseQuantity(product.id)}>+</button>
//               </div>
//               <button className="mt-2 text-red-500" onClick={() => removeItem(product.id)}>Delete</button>
//             </div>
//             <div className="text-xl font-bold">${(product.price * product.quantity).toFixed(2)}</div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-4">
//           <input
//             type="text"
//             placeholder="Enter Coupon Code"
//             className="border p-2 rounded w-1/2"
//           />
//           <button className="ml-4 bg-gray-700 text-white px-4 py-2 rounded">Go to Payment</button>
//         </div>
//         <div className="text-right text-2xl font-bold">
//           Total ${totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <footer className="mt-8 flex justify-between text-sm text-gray-500">
//         <div>
//           <h2 className="font-semibold">Contact us</h2>
//           <p>Phone: +3456 7890123</p>
//           <p>Email: abcd@abcd.com</p>
//           <p>Address: 1234, abfggeutu, Ireland - 000000</p>
//         </div>
//         <div>
//           <h2 className="font-semibold">Follow us</h2>
//           <p>Facebook | Instagram | LinkedIn</p>
//         </div>
//         <div>
//           <h2 className="font-semibold">About us</h2>
//           <p>Terms & Conditions</p>
//         </div>
//         <div>
//           <h2 className="font-semibold">Shop</h2>
//           <p>Wooden Plate</p>
//           <p>Traditional Irish Bowl Set</p>
//           <p>Bespoke Designs</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Addtocart;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addtocart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.example.com/products');
        setCart(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const increaseQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const removeItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-6">
        {cart.map((product) => (
          <div key={product.id} className="flex items-center justify-between border-b pb-4">
            <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 ml-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-2 flex items-center">
                <span className="mr-2">Quantity:</span>
                <button className="px-2 py-1 border" onClick={() => decreaseQuantity(product.id)}>-</button>
                <span className="mx-2">{product.quantity}</span>
                <button className="px-2 py-1 border" onClick={() => increaseQuantity(product.id)}>+</button>
              </div>
              <button className="mt-2 text-red-500" onClick={() => removeItem(product.id)}>Delete</button>
            </div>
            <div className="text-xl font-bold">${(product.price * product.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="border p-2 rounded w-1/2"
          />
          <button className="ml-4 bg-gray-700 text-white px-4 py-2 rounded">Go to Payment</button>
        </div>
        <div className="text-right text-2xl font-bold">
          Total ${totalAmount.toFixed(2)}
        </div>
      </div>
      <footer className="mt-8 flex justify-between text-sm text-gray-500">
        <div>
          <h2 className="font-semibold">Contact us</h2>
          <p>Phone: +3456 7890123</p>
          <p>Email: abcd@abcd.com</p>
          <p>Address: 1234, abfggeutu, Ireland - 000000</p>
        </div>
        <div>
          <h2 className="font-semibold">Follow us</h2>
          <p>Facebook | Instagram | LinkedIn</p>
        </div>
        <div>
          <h2 className="font-semibold">About us</h2>
          <p>Terms & Conditions</p>
        </div>
        <div>
          <h2 className="font-semibold">Shop</h2>
          <p>Wooden Plate</p>
          <p>Traditional Irish Bowl Set</p>
          <p>Bespoke Designs</p>
        </div>
      </footer>
    </div>
  );
};

export default Addtocart;
