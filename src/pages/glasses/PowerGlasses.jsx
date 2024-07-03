import React, { useEffect, useState } from 'react';
import { getProductsByCategoryApi } from '../../apis/Api'; // Import your API function
import Products from '../Products/Products';
import toast from 'react-hot-toast';

const PowerGlasses = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategoryApi('Power Glasses') // Fetch products by 'Sun Glasses' category
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
          toast.error(err.response.data.message); // Handle errors
          setProducts([]);
        }
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-center mt-8">PowerGlasses</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        {products.map((singleProduct) => (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50" key={singleProduct._id}>
            <Products productInformation={singleProduct} color={'red'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerGlasses;
