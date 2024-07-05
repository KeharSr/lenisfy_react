// import React, { useEffect } from 'react';
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// import { addToCartApi } from '../../apis/Api';
// import toast from 'react-hot-toast';

// const Products = ({ productInformation, color }) => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   if (!productInformation) {
//     return <div>Loading...</div>;
//   }

//   // Call add to cart from the api
//   const addToCart = async (productId) => {
//     addToCartApi({ productId }).then((res) => {
//       if (res.status === 201) {
//         toast.success('Product added to cart');
//       }
//     }).catch((err) => {
//       console.log(err);
//     });
//   };

//   return (
//     <div className="w-72 border border-gray-300 rounded-lg overflow-hidden relative shadow-lg text-center" data-aos="fade-up">
//       <div className="absolute top-2 left-2 text-white py-1 px-3 rounded text-xs" style={{ backgroundColor: color }}>
//         {productInformation.productCategory}
//       </div>
//       <div className="absolute top-2 right-2 text-white py-1 px-3 rounded text-xs bg-red-500">
//         30% Off
//       </div>
//       <div className="w-full h-52 overflow-hidden relative">
//         <img
//           src={`http://localhost:5000/products/${productInformation.productImage}`}
//           className="w-full h-full object-cover"
//           alt={productInformation.productName}
//         />
//         <div className="absolute top-2 left-2 text-gray-700 flex items-center">
//           <i className="far fa-heart"></i>
//           <span className="ml-1">234</span>
//         </div>
//       </div>
//       <div className="p-4">
//         <h5 className="text-lg font-bold mb-1">{productInformation.productName}</h5>
//         <div className="text-gray-500 text-md mb-2">Smart Watches</div>
//         <div className="text-red-500 text-md mb-2">${productInformation.productPrice}</div>
//         <p className="text-sm text-gray-600 mb-5">{productInformation.productDescription}</p>
//         <button
//           className="text-green-500 border border-green-500 py-2 rounded w-full uppercase font-bold flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white mb-2 transition-colors duration-200"
//           onClick={() => addToCart(productInformation._id)}
//         >
//           Buy Now
//         </button>
//         <button
//           className="text-gray-700 border border-gray-300 py-2 rounded w-full uppercase font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors duration-200"
//           // onClick={() => addToCart(productInformation._id)}
//         >
//           View More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Products;



import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { addToCartApi } from '../../apis/Api';
import toast from 'react-hot-toast';

const Products = ({ productInformation, color }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (!productInformation) {
    return <div>Loading...</div>;
  }

  // Call add to cart from the api
  const addToCart = async (productId) => {
    addToCartApi({ productId }).then((res) => {
      if (res.status === 201) {
        toast.success('Product added to cart');
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="w-72 border border-gray-300 rounded-lg overflow-hidden relative shadow-lg text-center" data-aos="fade-up">
      <div className="absolute top-2 left-2 text-white py-1 px-3 rounded text-xs" style={{ backgroundColor: color }}>
        {productInformation.productCategory}
      </div>
      <div className="absolute top-2 right-2 text-white py-1 px-3 rounded text-xs bg-red-500">
        30% Off
      </div>
      <div className="w-full h-52 overflow-hidden relative">
        <img
          src={`http://localhost:5000/products/${productInformation.productImage}`}
          className="w-full h-full object-cover"
          alt={productInformation.productName}
        />
        <div className="absolute top-2 left-2 text-gray-700 flex items-center">
          <i className="far fa-heart"></i>
          <span className="ml-1">234</span>
        </div>
      </div>
      <div className="p-4">
        <h5 className="text-lg font-bold mb-1">{productInformation.productName}</h5>
        <div className="text-gray-500 text-md mb-2">Smart Watches</div>
        <div className="text-red-500 text-md mb-2">${productInformation.productPrice}</div>
        <p className="text-sm text-gray-600 mb-5">{productInformation.productDescription}</p>
        <button
          className="text-green-500 border border-green-500 py-2 rounded w-full uppercase font-bold flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white mb-2 transition-colors duration-200"
          onClick={() => addToCart(productInformation._id)}
        >
          Buy Now
        </button>
        <Link to={`/product/${productInformation._id}`} className="w-full">
          <button
            className="text-gray-700 border border-gray-300 py-2 rounded w-full uppercase font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors duration-200"
          >
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
