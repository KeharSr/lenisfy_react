



import React, { useEffect, useState } from 'react';

import Hero from '../../components/Hero/Hero';
import Products from '../Products/Products';
import Banner from '../../components/Banner/Banner';
import { getAllProductsApi } from "../../apis/Api"; // Only import the API function to fetch all products
import Navbar from '../../components/navbar/Navbar';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProductsApi() // Fetch all products initially
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar/>     
      <Hero />
      <h2 className="text-center mt-8 text-2xl font-semibold">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
        {products.slice(0, 2).map((singleProduct) => ( // Limit to 2 products
          <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200" key={singleProduct._id}>
            <Products productInformation={singleProduct} color={'red'} />
          </div>
        ))}
      </div>
      <Banner />
    </>
  );
};

export default HomePage;
