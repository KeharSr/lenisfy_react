// import React, { useEffect, useState } from 'react';
// import { getProductsByCategoryApi } from '../../apis/Api'; // Import your API function
// import Products from '../Products/Products';
// import toast from 'react-hot-toast';
// import Navbar from '../../components/navbar/Navbar';


// const SunGlasses = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getProductsByCategoryApi('Sun Glasses') // Fetch products by 'Sun Glasses' category
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
//           toast.error(err.response.data.message); // Handle errors
//           setProducts([]);
//         }
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <Navbar/>
    
//     <div>
//       <h2 className="text-center mt-8">Sunglasses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
//         {products.map((singleProduct) => (
//           <div className="p-4 border border-gray-200 rounded-lg bg-gray-50" key={singleProduct._id}>
//             <Products productInformation={singleProduct} color={'red'} />
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default SunGlasses;


import React, { useEffect, useState } from 'react';
import { getProductsByCategoryApi } from '../../apis/Api';
import Products from '../Products/Products';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import { motion } from 'framer-motion';
import { Sun, Loader } from 'lucide-react';

const SunGlasses = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategoryApi('Sun Glasses')
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response?.status === 400) {
          toast.error(err.response.data.message);
          setProducts([]);
        }
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading amazing sunglasses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Sunglasses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Protect your eyes in style with our curated collection of premium sunglasses.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Sun className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No sunglasses available at the moment</h2>
            <p className="mt-2 text-gray-600">Check back soon for our latest collection!</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {products.map((singleProduct) => (
              <motion.div
                key={singleProduct._id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Products productInformation={singleProduct} color={'indigo'} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SunGlasses;