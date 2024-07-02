// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getCartApi } from '../../apis/Api';

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     getCartApi().then(res => {
//       if (res.status === 200) {
//         setCart(res.data.cart);
//       }
//     }).catch(err => {
//       console.log(err);
//     });
    
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {cart.map(item => (
//             <div key={item._id} className="border rounded-lg p-4 shadow-lg">
//               <div className="w-full h-52 overflow-auto">
//                 <img
//                   src={`http://localhost:5000/products/${item.productImage}`}
//                   className="w-full h-full object-cover"
//                   alt={item.productName}
//                 />
//               </div>
//               <h5 className="text-lg font-bold mb-1">{item.productName}</h5>
//               <div className="text-red-500 text-md mb-2">{item.productPrice}</div>
//               <p className="text-sm text-gray-600 mb-5">{item.productDescription}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


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
        setCart(res.data.products);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const getTotalPrice = (item) => item.product.productPrice * item.count;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={`http://localhost:5000/products/${item.product.productImage}`}
                      className="w-16 h-16 object-cover mr-4"
                      alt={item.productName}
                    />
                    <div>
                      <div className="font-bold">{item.productName}</div>
                      <div className="text-sm text-gray-600">{item.productDescription}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.product.productPrice}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button className="px-2 py-1 border">-</button>
                      <span className="px-2">{item.count}</span>
                      <button className="px-2 py-1 border">+</button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-red-500 font-bold">{getTotalPrice(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
