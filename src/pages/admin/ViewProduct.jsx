import React, { useEffect, useState } from 'react';
import { getAllProductsApi,deleteProduct } from '../../apis/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        if (res.data.success && res.data.products) {
          setProducts(res.data.products);
        } else {
          console.error('Error Fetching Products');
        }
      })
      .catch((error) => {
        console.error('Error Fetching Products:', error);
      });
  }, []);

  const handleEdit = (productId) => {
    console.log('Edit product with id:', productId);
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete this product?')
    if (confirmDialog) {
        // make a api call
        deleteProduct(id).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message)
                window.location.reload()
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    toast.error(error.response.data.message)
                    
                } else if (error.response.status === 500) {
                    toast.warning(error.response.data.message)
                }
                else {
                    toast.error('Something went worng')
                }
            }
        })
        
       
    }
    
    
}

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Image</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">
                  <img src={`http://localhost:5000/products/${product.productImage}`} alt={product.productName} className="h-20 w-20 object-cover rounded"/>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{product.productName}</td>
                <td className="px-4 py-2 border-b border-gray-200">{product.productCategory}</td>
                <td className="px-4 py-2 border-b border-gray-200">${product.productPrice}</td>
                <td className="px-4 py-2 border-b border-gray-200">{product.productDescription}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button onClick={() => handleEdit(product._id)} className="text-blue-500 hover:text-blue-700 mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
