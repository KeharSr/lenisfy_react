// __mock__/cartMockData.js
const cartMockData = {
    products: [
      {
        _id: "cartItem1",
        quantity: 2,
        productId: {
          _id: "product1",
          productName: "Product 1",
          productPrice: 100.0,
          productQuantity: 5,
          productImage: "image1.jpg",
          productDescription: "Description for Product 1"
        }
      },
      {
        _id: "cartItem2",
        quantity: 1,
        productId: {
          _id: "product2",
          productName: "Product 2",
          productPrice: 200.0,
          productQuantity: 3,
          productImage: "image2.jpg",
          productDescription: "Description for Product 2"
        }
      }
    ]
  };
  
  export default cartMockData;
  