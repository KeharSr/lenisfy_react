

// import React from 'react';

// const Products = ({ productInformation, color }) => {
//     // Debugging statement to see the received props
//     console.log('Product Information:', productInformation);

//     // Conditional rendering to handle undefined productInformation
//     if (!productInformation) {
//         return <div>Loading...</div>; // or some other placeholder
//     }

//     return (
//         <div className="card" style={{ width: '18rem' }}>
//             <span
//                 style={{
//                     backgroundColor: color,
//                     color: 'white',
//                     padding: '5px',
//                     borderRadius: '5px'
//                 }}
//                 className="badge position-absolute top-0"
//             >
//                 {productInformation.productCategory}
//             </span>
//             <img
//                 src={`http://localhost:5000/products/${productInformation.productImage}`}
//                 className="card-img-top"
//                 alt={productInformation.productName}
//             />
//             <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                     <h5 className="card-title">{productInformation.productName}</h5>
//                     <h5 className="card-title text-danger">{productInformation.productPrice}</h5>
//                 </div>
//                 <p className="card-text">
//                     {productInformation.productDescription.slice(0, 40)}
//                 </p>
//                 <a href="#" className="btn btn-outline-dark w-100">View More</a>
//             </div>
//         </div>
//     );
// };

// export default Products;


import React from 'react';

const Products = ({ productInformation, color }) => {
    if (!productInformation) {
        return <div>Loading...</div>;
    }

    const styles = {
        card: {
            width: '18rem',
            border: '1px solid #ddd',
            borderRadius: '5px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
        },
        badge: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            backgroundColor: color
        },
        imageContainer: {
            width: '100%',
            height: '200px', // Fixed height for the image container
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover' // Ensures the image covers the container without stretching
        },
        body: {
            padding: '15px'
        },
        title: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '5px'
        },
        price: {
            fontSize: '16px',
            color: '#ff4d4d',
            marginBottom: '10px'
        },
        description: {
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
        },
        button: {
            backgroundColor: '#ff8c00',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
        },
        buttonHover: {
            backgroundColor: '#ff7a00'
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.badge}>
                {productInformation.productCategory}
            </div>
            <div style={styles.imageContainer}>
                <img
                    src={`http://localhost:5000/products/${productInformation.productImage}`}
                    style={styles.image}
                    alt={productInformation.productName}
                />
            </div>
            <div style={styles.body}>
                <h5 style={styles.title}>{productInformation.productName}</h5>
                <div style={styles.price}>{productInformation.productPrice}</div>
                <p style={styles.description}>
                    {productInformation.productDescription.slice(0, 40)}...
                </p>
                <button
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Products;
