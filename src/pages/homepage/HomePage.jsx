
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Products from '../../components/Products/Products';
import Banner from '../../components/Banner/Banner';
import { getAllProductsApi, getProductsByCategoryApi } from "../../apis/Api"; // Update API function to fetch products by category
import toast from 'react-hot-toast';

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

  const handleCategoryFilter = (category) => {
    setLoading(true); // Set loading state while fetching new products
    getProductsByCategoryApi(category) // Fetch products by category
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data.message); // Set products to empty array if no products found
        }
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <div>
        {/* Category filter buttons */}
        <button onClick={() => handleCategoryFilter('All')}>All</button>
        <button onClick={() => handleCategoryFilter('Sun Glasses')}>Sun Glasses</button>
        <button onClick={() => handleCategoryFilter('Power Glasses')}>Power Glasses</button>
      </div>
      <h2>Available Products</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((singleProduct) => (
          <div className="col" key={singleProduct._id}>
            <Products productInformation={singleProduct} color={'red'} />
          </div>
        ))}
      </div>
      <Banner /> 
    </>
  );
};

export default HomePage;


