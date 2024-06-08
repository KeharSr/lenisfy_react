import React, { useState } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductImageChange = (e) => {
    setProductImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log('Form submitted:', {
      productName,
      productCategory,
      productPrice,
      productDescription,
      productImage
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="productName"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={handleProductNameChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productCategory">
              Product Category
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="productCategory"
              type="text"
              placeholder="Product Category"
              value={productCategory}
              onChange={handleProductCategoryChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productPrice">
            Product Price
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="productPrice"
            type="text"
            placeholder="Product Price"
            value={productPrice}
            onChange={handleProductPriceChange}
          />
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productDescription">
            Product Description
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="productDescription"
            placeholder="Product Description"
            value={productDescription}
            onChange={handleProductDescriptionChange}
          />
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productImage">
            Upload Image
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="productImage"
            type="file"
            onChange={handleProductImageChange}
          />
          {productImage && (
            <img src={productImage} alt="Selected Product" className="mt-2 h-40 object-cover rounded" />
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
