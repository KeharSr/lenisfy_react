// import React from 'react'

// const PlaceOrder = () => {
//   // Example data, replace with actual data from your state or props
//   const subtotal = 200.00; // This would be calculated from your cart data
//   const deliveryFee = 20.00; // This could be a fixed value or calculated based on address
  
//   const total = subtotal + deliveryFee;

//   return (
//     <>
//       <form className='place-order flex justify-between p-8 bg-gray-100'>
//         <div className="place-order-left w-1/2 p-4">
//             <p className="title font-bold mb-4">Delivery Information</p>
//             <div className="multi-fields flex space-x-2 mb-4">
//                 <input type="text" placeholder='First Name' className='flex-1 p-2 border border-gray-300'/>
//                 <input type="text" placeholder='Last Name' className='flex-1 p-2 border border-gray-300'/>
//             </div>
//             <input type="email" placeholder='Email Address' className='w-full p-2 mb-4 border border-gray-300'/>
//             <input type="text" placeholder='Street' className='w-full p-2 mb-4 border border-gray-300'/>
//             <div className="multi-fields flex space-x-2 mb-4">
//                 <input type="text" placeholder='City' className='flex-1 p-2 border border-gray-300'/>
//                 <input type="text" placeholder='State' className='flex-1 p-2 border border-gray-300'/>
//             </div>
//             <div className="multi-fields flex space-x-2 mb-4">
//                 <input type="text" placeholder='Zip code' className='flex-1 p-2 border border-gray-300'/>
//                 <input type="text" placeholder='Country' className='flex-1 p-2 border border-gray-300'/>
//             </div>
//             <input type="text" placeholder='Phone' className='w-full p-2 mb-4 border border-gray-300'/>
//         </div>
//         <div className="place-order-right w-1/2 p-4 bg-white shadow-md">
//             <p className="title font-bold mb-4">Cart Totals</p>
//             <div className="totals flex justify-between mb-2">
//                 <span>Subtotal:</span>
//                 <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="totals flex justify-between mb-2">
//                 <span>Delivery Fee:</span>
//                 <span>${deliveryFee.toFixed(2)}</span>
//             </div>
//             <div className="totals flex justify-between font-bold mb-4">
//                 <span>Total:</span>
//                 <span>${total.toFixed(2)}</span>
//             </div>
//             <button type="button" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
//                 Proceed to Payment
//             </button>
//         </div>
//       </form>
//     </>
//   )
// }

// export default PlaceOrder


import React from 'react';

const PlaceOrder = () => {
  // Example data, replace with actual data from your state or props
  const subtotal = 200.00; // This would be calculated from your cart data
  const deliveryFee = 20.00; // This could be a fixed value or calculated based on address
  
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-gray-100 p-8">
      <form className='place-order flex justify-between'>
        <div className="place-order-left w-1/2 pr-4">
            <p className="title font-bold text-lg mb-4">Delivery Information</p>
            <div className="multi-fields flex space-x-4 mb-4">
                <input type="text" placeholder='First Name' className='flex-1 p-3 border border-gray-300 rounded'/>
                <input type="text" placeholder='Last Name' className='flex-1 p-3 border border-gray-300 rounded'/>
            </div>
            <input type="email" placeholder='Email Address' className='w-full p-3 mb-4 border border-gray-300 rounded'/>
            <input type="text" placeholder='Street' className='w-full p-3 mb-4 border border-gray-300 rounded'/>
            <div className="multi-fields flex space-x-4 mb-4">
                <input type="text" placeholder='City' className='flex-1 p-3 border border-gray-300 rounded'/>
                <input type="text" placeholder='State' className='flex-1 p-3 border border-gray-300 rounded'/>
            </div>
            <div className="multi-fields flex space-x-4 mb-4">
                <input type="text" placeholder='Zip code' className='flex-1 p-3 border border-gray-300 rounded'/>
                <input type="text" placeholder='Country' className='flex-1 p-3 border border-gray-300 rounded'/>
            </div>
            <input type="text" placeholder='Phone' className='w-full p-3 mb-4 border border-gray-300 rounded'/>
        </div>
        <div className="place-order-right w-1/2 pl-4 bg-white p-4 shadow-lg">
            <p className="title font-bold text-lg mb-4">Cart Totals</p>
            <div className="totals flex justify-between mb-2 text-lg">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="totals flex justify-between mb-2 text-lg">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="totals flex justify-between font-bold mb-4 text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button type="button" className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg'>
                Proceed to Payment
            </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
