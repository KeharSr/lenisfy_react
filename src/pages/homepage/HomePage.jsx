
import React, { useEffect, useState } from 'react';
import { getAllProductsApi, getAverageRatingApi } from "../../apis/Api";
import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Products from '../Products/Products';
import Banner from '../../components/Banner/Banner';
import { ArrowRightIcon, Star } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsRatings, setProductsRatings] = useState({});

  useEffect(() => {
    getAllProductsApi()
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

  useEffect(() => {
        for (let i = 0; i < products.length; i++) {
          getAverageRatingApi(products[i]._id)
            .then((res) => {
              if (res.status === 200) {
                const ratings=res.data.averageRating
                const id=res.data.productId

                // cretae a map between product id and rating
                setProductsRatings((prev) => {
                  return {...prev, [id]:ratings}

                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
          
      }, 
      [products]);

  useEffect(() => {
    console.log(productsRatings);
  }, [productsRatings]);

    

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        
        <section className="mt-16 mb-12">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((singleProduct) => (
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out" 
                key={singleProduct._id}
              >
                <Products productInformation={singleProduct} color={'red'} />
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Average Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm font-semibold text-gray-800">
                        {productsRatings[singleProduct._id] ? productsRatings[singleProduct._id].toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a 
              href="/products" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Products
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>

        <Banner />

        <section className="my-16">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Products', description: 'We offer only the highest quality products to our customers.' },
              { title: 'Fast Shipping', description: 'Get your orders delivered quickly and efficiently.' },
              { title: 'Customer Support', description: '24/7 customer support to assist you with any queries.' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">We are committed to providing the best products and services to our customers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/products" className="text-gray-400 hover:text-white">Products</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">123 Main St, City, Country</p>
              <p className="text-gray-400">Phone: +1 234 567 890</p>
              <p className="text-gray-400">Email: info@example.com</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;