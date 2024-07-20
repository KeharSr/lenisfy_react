import React, { useState, useEffect } from 'react';
import { getAllOrdersApi } from '../../apis/Api';

const ViewOrder = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        getAllOrdersApi()
            .then((res) => {
                if (res.data.success && res.data.orders) {
                    setOrders(res.data.orders);
                } else {
                    console.error('Error Fetching Orders');
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

    if (isLoading) {
        return <div className="text-center mt-5">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-5">Error: {error}</div>;
    }

    const formatAddress = (address) => {
        // Combining the address fields into a single string
        return `${address.firstName},${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
    };

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-xl font-bold mb-5">View Orders</h1>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order._id} className="bg-white p-6 rounded-lg shadow mb-4">
                        <div className="mb-2 font-bold text-lg">
                            Ordered by: {order.userId} {/* Display the user's name */}
                        </div>
                        <div className="mb-2 font-bold text-lg">
                            {order.products.map(product => `${product.productId} x ${product.quantity}`).join(', ')} {/* List of products */}
                        </div>
                        <div className="text-gray-600">
                            Items: {order.products.reduce((total, product) => total + product.quantity, 0)}
                        </div>
                        <div className="text-gray-600">
                            Total Price: ${order.totalPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            {formatAddress(order.address)}
                        </div>
                        <div className="text-sm text-gray-600">
                            {order.address.phone}
                        </div>
                        <select className="mt-4 p-2 bg-gray-200 rounded">
                            <option>Food Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                        </select>
                    </div>
                ))
            ) : (
                <div>No orders found</div>
            )}
        </div>
    );
};

export default ViewOrder;
