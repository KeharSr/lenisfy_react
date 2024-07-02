


import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { addToCartApi } from '../../apis/Api';
import toast from 'react-hot-toast';

const Products = ({ productInformation, color,}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (!productInformation) {
    return <div>Loading...</div>;
  }

  // call add to cart from the api
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
      <div className={`absolute top-2 left-2 text-white py-1 px-3 rounded text-xs`} style={{ backgroundColor: color }}>
        {productInformation.productCategory}
      </div>
      <div className="w-full h-52 overflow-hidden">
        <img
          src={`http://localhost:5000/products/${productInformation.productImage}`}
          className="w-full h-full object-cover"
          alt={productInformation.productName}
        />
      </div>
      <div className="p-4">
        <h5 className="text-lg font-bold mb-1">{productInformation.productName}</h5>
        <div className="text-red-500 text-md mb-2">{productInformation.productPrice}</div>
        <p className="text-sm text-gray-600 mb-5">
          {productInformation.productDescription.slice(0, 40)}...
        </p>
        <button
          className="bg-orange-500 text-white border-none py-2 rounded w-full uppercase font-bold flex items-center justify-center gap-2 hover:bg-orange-600"
          onClick={() => addToCart(productInformation._id)}
        >
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
