

import React from 'react';

const Products = ({ productInformation, color }) => {
    // Debugging statement to see the received props
    console.log('Product Information:', productInformation);

    // Conditional rendering to handle undefined productInformation
    if (!productInformation) {
        return <div>Loading...</div>; // or some other placeholder
    }

    return (
        <div className="card" style={{ width: '18rem' }}>
            <span
                style={{
                    backgroundColor: color,
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px'
                }}
                className="badge position-absolute top-0"
            >
                {productInformation.productCategory}
            </span>
            <img
                src={`http://localhost:5000/products/${productInformation.productImage}`}
                className="card-img-top"
                alt={productInformation.productName}
            />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{productInformation.productName}</h5>
                    <h5 className="card-title text-danger">{productInformation.productPrice}</h5>
                </div>
                <p className="card-text">
                    {productInformation.productDescription.slice(0, 40)}
                </p>
                <a href="#" className="btn btn-outline-dark w-100">View More</a>
            </div>
        </div>
    );
};

export default Products;
