// __mock__/orderMockData.js
const orderMockData = [
    {
      _id: "order1",
      status: "Delivered",
      total: 120.5,
      products: [
        {
          productId: {
            _id: "product1",
            productName: "Product 1",
          },
          quantity: 2,
        },
      ],
    },
    {
      _id: "order2",
      status: "Shipped",
      total: 200.0,
      products: [
        {
          productId: {
            _id: "product2",
            productName: "Product 2",
          },
          quantity: 1,
        },
      ],
    },
  ];
  
  export default orderMockData;
  