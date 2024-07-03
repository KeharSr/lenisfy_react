// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/navbar/Navbar';
// import Hero from '../../components/Hero/Hero';
// import Products from '../Products/Products';
// import Banner from '../../components/Banner/Banner';
// import { getAllProductsApi, getProductsByCategoryApi } from "../../apis/Api"; // Update API function to fetch products by category
// import toast from 'react-hot-toast';
// import { FaSun, FaGlasses, FaThList } from 'react-icons/fa'; // Importing FontAwesome icons

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

//   const handleCategoryFilter = (category) => {
//     setLoading(true); // Set loading state while fetching new products
//     getProductsByCategoryApi(category) // Fetch products by category
//       .then((res) => {
//         if (res.status === 201) {
//           setProducts(res.data.products);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//         if (err.response.status === 400) {
//           toast.error(err.response.data.message); // Set products to empty array if no products found
//         }
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {/* <Navbar  /> */}
//       <Hero />
//       <div className="flex justify-center gap-4 mb-8">
//         <button 
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
//           onClick={() => handleCategoryFilter('All')}
//         >
//           <FaThList className="text-xl text-gray-700" />
//         </button>
//         <button 
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
//           onClick={() => handleCategoryFilter('Sun Glasses')}
//         >
//           <FaSun className="text-xl text-gray-700" />
//         </button>
//         <button 
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
//           onClick={() => handleCategoryFilter('Power Glasses')}
//         >
//           <FaGlasses className="text-xl text-gray-700" />
//         </button>
//       </div>
//       <h2 className="text-center mt-8">Available Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
//         {products.map((singleProduct) => (
//           <div className="p-4 border border-gray-200 rounded-lg bg-gray-50" key={singleProduct._id}>
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
import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Products from '../Products/Products';
import Banner from '../../components/Banner/Banner';
import { getAllProductsApi, getProductsByCategoryApi } from "../../apis/Api"; // Update API function to fetch products by category
import toast from 'react-hot-toast';
import { FaSun, FaGlasses, FaThList } from 'react-icons/fa'; // Importing FontAwesome icons

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('All'); // State for selected tab

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
    setSelectedTab(category); // Update selected tab state
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
      {/* <Navbar  /> */}
      <Hero />
      <div className="flex justify-center gap-4 mb-8">
        <div
          className={`flex flex-col items-center p-2 rounded-full cursor-pointer transition duration-200 ${
            selectedTab === 'All' ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryFilter('All')}
        >
          <FaThList className="text-xl text-gray-700" />
          <span className="mt-1 text-sm text-gray-700">All</span>
        </div>
        <div
          className={`flex flex-col items-center p-2 rounded-full cursor-pointer transition duration-200 ${
            selectedTab === 'Sun Glasses' ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryFilter('Sun Glasses')}
        >
          <FaSun className="text-xl text-gray-700" />
          <span className="mt-1 text-sm text-gray-700">Sun Glasses</span>
        </div>
        <div
          className={`flex flex-col items-center p-2 rounded-full cursor-pointer transition duration-200 ${
            selectedTab === 'Power Glasses' ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryFilter('Power Glasses')}
        >
          <FaGlasses className="text-xl text-gray-700" />
          <span className="mt-1 text-sm text-gray-700">Power Glasses</span>
        </div>
      </div>
      <h2 className="text-center mt-8">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        {products.map((singleProduct) => (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50" key={singleProduct._id}>
            <Products productInformation={singleProduct} color={'red'} />
          </div>
        ))}
      </div>
      <Banner />
    </>
  );
};

export default HomePage;
