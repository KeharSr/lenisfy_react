

import React, { useEffect, useState } from 'react';
import { placeOrderApi } from '../../apis/Api'; 

import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const PlaceOrder = () => {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const params= useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        deliveryFee: 40.00 // This can be a fixed or dynamically calculated value
    });

    useEffect(() => {
        console.log(params);
        
        const carts = JSON.parse(params.cart);
        console.log(carts);
        if(params.cart){
            setCart(JSON.parse(params.cart));
            setSubtotal(0);
            for (let i = 0; i < carts.length; i++) {
                setSubtotal(prev => prev + (carts[i].productId.productPrice * carts[i].quantity));
            }
        }
    }, [
        params
    ]);

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Function to validate order data before submission
    const validateOrderData = () => {
        const { firstName, lastName, email, street, city, state, zipCode, country, phone } = formData;
        if (!firstName || !lastName || !email || !street || !city || !state || !zipCode || !country || !phone) {
            alert('Please fill all the fields.');
            return false;
        }
        if (!cart.length || cart.some(product => !product.productId || !product.productId._id || product.quantity <= 0)) {
            alert('No products added to the order or invalid product data.');
            return false;
        }
        return true;
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(cart);
        if (!validateOrderData()) {
            return; // Stop submission if validation fails
        }
        const total = subtotal + formData.deliveryFee;
        const orderData = {
            products: cart.map(product => ({
                productId: product.productId._id,
                quantity: product.quantity
            })),
            totalPrice: total,
            address: {...formData},
            payment: true
        };

        try {
            const response = await placeOrderApi(orderData);
            if (response.data.order) {
                toast.success('Order placed successfully!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Error placing order: ' + (error.response?.data?.message || error.message || 'Unknown error'));
        }
    };

    return (
        <div className="bg-gray-100 p-8">
            <form className='place-order flex justify-between' onSubmit={handleSubmit}>
                <div className="place-order-left w-1/2 pr-4">
                    <p className="title font-bold text-lg mb-4">Delivery Information</p>
                    {Object.entries(formData).map(([key, value]) => key !== 'deliveryFee' && (
                        <input
                            key={key}
                            type={key === 'email' ? 'email' : 'text'}
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, ' $&')}
                            className='w-full p-3 mb-4 border border-gray-300 rounded'
                            onChange={handleChange}
                            value={value}
                        />
                    ))}
                </div>
                <div className="place-order-right w-1/2 pl-4 bg-white p-4 shadow-lg">
                    <p className="title font-bold text-lg mb-4">Cart Totals</p>
                    {cart.map((product, index) => (
                        <div key={index} className="flex justify-between text-lg mb-2">
                            <span>{product.productId.productName} x {product.quantity}</span>
                            <span>${(product.productId.productPrice * product.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between text-lg mb-2">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg mb-2">
                        <span>Delivery Fee:</span>
                        <span>${formData.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total:</span>
                        <span>${(subtotal + formData.deliveryFee).toFixed(2)}</span>
                    </div>
                    <button type="submit" className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg'>
                        Proceed to Payment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;


