

import React, { useEffect, useState } from 'react';
import { getAllProductsApi, deleteProduct } from '../../apis/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import UpdateProduct from './UpdateProduct';
import DeleteConfirmationDialog from '../../components/DeleteDialog/DeleteDialog'; 

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
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
  };

  const handleEdit = (productId) => {
    setEditProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(deleteProductId)
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
          fetchProducts(); 
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 500) {
            toast.warning(error.response.data.message);
          } else {
            toast.error('Something went wrong');
          }
        }
      })
      .finally(() => {
        setIsDeleteDialogOpen(false);
      });
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

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
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border-b">
                  <img
                    src={`http://localhost:5000/products/${product.productImage}`}
                    alt={product.productName}
                    className="h-20 w-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">{product.productName}</td>
                <td className="px-4 py-2 border-b">{product.productCategory}</td>
                <td className="px-4 py-2 border-b">{product.productDescription}</td>
                <td className="px-4 py-2 border-b">${product.productPrice}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <UpdateProduct
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          productId={editProductId}
          onUpdate={fetchProducts}
        />
      )}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ViewProduct;
