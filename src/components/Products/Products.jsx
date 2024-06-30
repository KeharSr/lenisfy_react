


import React, { useEffect } from 'react';

const Products = ({ productInformation, color }) => {
  useEffect(() => {
    // Initialize AOS when component mounts
    const AOS = require('aos');
    AOS.init({ duration: 1000 }); // Adjust duration as needed
  }, []);

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
    <div style={styles.card} data-aos='fade-up'>
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
