



// import React, { useEffect, useState } from 'react';

// import Hero from '../../components/Hero/Hero';
// import Products from '../Products/Products';
// import Banner from '../../components/Banner/Banner';
// import { getAllProductsApi } from "../../apis/Api"; // Only import the API function to fetch all products
// import Navbar from '../../components/navbar/Navbar';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllProductsApi() // Fetch all products initially
//       .then((res) => {
//         if (res.status === 201) {
//           setProducts(res.data.products);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar/>     
//       <Hero />
//       <h2 className="text-center mt-8 text-2xl font-semibold">Available Products</h2>
//       <div className="flex flex-row gap-4">
//         {products.slice(0, 4).map((singleProduct) => ( // Limit to 2 products
//           <div className="w-full max-w-96 p-4 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200" key={singleProduct._id}>
//             <Products productInformation={singleProduct} color={'red'} />
//           </div>
//         ))}
//       </div>
//       <Banner />
//     </>
//   );
// };

// export default HomePage;



import React, { useEffect, useState } from 'react';
import { getAllProductsApi } from "../../apis/Api";
import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Products from '../Products/Products';
import Banner from '../../components/Banner/Banner';
import { ArrowRightIcon } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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