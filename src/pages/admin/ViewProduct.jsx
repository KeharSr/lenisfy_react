import React from 'react';

const ViewProduct = () => {
  // Example product data
  const products = [
    {
      id: 1,
      name: 'Classic Sunglasses',
      category: 'Sunglasses',
      price: '$50',
      description: 'Stylish sunglasses for sunny days.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Reading Glasses',
      category: 'Power Glasses',
      price: '$30',
      description: 'Comfortable reading glasses with a modern design.',
      image: 'https://via.placeholder.com/150'
    }
    // Add more products as needed
  ];

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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">
                  <img src={product.image} alt={product.name} className="h-20 w-20 object-cover rounded"/>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{product.name}</td>
                <td className="px-4 py-2 border-b border-gray-200">{product.category}</td>
                <td className="px-4 py-2 border-b border-gray-200">{product.price}</td>
                <td className="px-4 py-2 border-b border-gray-200">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
