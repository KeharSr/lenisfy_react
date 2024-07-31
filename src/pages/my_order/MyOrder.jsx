import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { getOrdersByUserApi } from '../../apis/Api';
import { toast } from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      getOrdersByUserApi()
        .then((res) => {
          if (res.data.success && res.data.orders) {
            setOrders(res.data.orders);
          } else {
            toast.error('Error Fetching Orders');
          }
        })
        .catch((error) => {
          console.error('Error Fetching Orders:', error);
          setError('Error fetching orders. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchOrders();
  }, []);

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await getOrdersByUserApi();
      if (response.data.success) {
        const updatedOrder = response.data.orders.find(order => order._id === orderId);
        if (updatedOrder) {
          setOrders(orders.map(order => (order._id === orderId ? updatedOrder : order)));
          toast.success('Order status updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      toast.error('Failed to track order. Please try again later.');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading orders...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">My Orders</h1>
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Package className="text-orange-500 mr-2" size={24} />
                  <span className="text-xl font-semibold text-gray-800">Order #{order._id}</span>
                </div>
                <span className="text-sm font-medium text-orange-500">{order.status}</span>
              </div>
              <div className="mb-4">
                {order.products.map((product) => (
                  <div key={product.productId._id} className="text-sm text-gray-600 mb-1">
                    {product.productId.productName} x {product.quantity}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
                  Total: ${order.total ? order.total.toFixed(2) : '0.00'}
                </span>
                <button
                  onClick={() => handleTrackOrder(order._id)}
                  className="w-full sm:w-auto bg-pink-100 text-pink-600 px-6 py-2 rounded-md text-sm font-medium hover:bg-pink-200 transition-colors"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
