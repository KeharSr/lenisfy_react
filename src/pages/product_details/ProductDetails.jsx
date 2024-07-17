// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getSingleProductApi, addToCartApi } from '../../apis/Api';
// import toast from 'react-hot-toast';
// import Navbar from '../../components/navbar/Navbar';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState("");
//   const [isOutStock, setIsOutStock] = useState(false);

//   useEffect(() => {
//     getSingleProductApi(id)
//       .then((res) => {
//         if (res.status === 201) {
//           setProduct(res.data.product);
//           updateStockStatus(res.data.product, quantity);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   // Function to check stock based on product and quantity
//   const updateStockStatus = (product, quantity) => {
//     if (product.productQuantity < quantity) {
//       setError("Out of Stock");
//       setIsOutStock(true);
//     } else {
//       setError("");
//       setIsOutStock(false);
//     }
//   };

//   // Handle quantity change with stock condition
//   const handleQuantityChange = (newQuantity) => {
//     newQuantity = parseInt(newQuantity, 10);
//     if (newQuantity > quantity && isOutStock) {
//       // Prevent increasing quantity if out of stock
//       return;
//     }
//     setQuantity(newQuantity);
//     if (product) {
//       updateStockStatus(product, newQuantity);
//     }
//   };

//   const addToCart = () => {
//     if (!isOutStock && product && quantity > 0) {
//       addToCartApi({ productId: product._id,quantity:quantity }).then((res) => {
//         if (res.status === 201) {
//           toast.success('Product added to cart');
//         }
//         else {
//           toast.error(res.data.message);
//         }
//       }).catch((err) => {
//         console.log(err);
//         toast.error('Failed to add to cart');
//       });
//     }
//   };

//   const buyNow = () => {
//     addToCart();
//     // Redirect to cart or checkout page
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <Navbar/>
//     <div className="container mx-auto p-4 flex flex-col md:flex-row">
//       <div className="md:w-1/2 mb-4 md:mb-0">
//         <img src={`http://localhost:5000/products/${product.productImage}`}
//           alt={product.productName}
//           className="w-full h-96 object-cover rounded-md" />
//         <div className="flex mt-4 space-x-2">
//           {product.additionalImages && product.additionalImages.map((img, index) => (
//             <img key={index} src={`http://localhost:5000/products/${img}`}
//               alt={`Additional ${index}`}
//               className="w-20 h-20 object-cover rounded-md cursor-pointer" />
//           ))}
//         </div>
//       </div>
//       <div className="md:w-1/2 md:pl-8">
//         <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
//         <div className="flex items-center mb-2">
//           <span className="text-blue-500 mr-2">Visit Store</span>
//           <span className="text-yellow-500 mr-2">★ {product.rating}</span>
//           <span className="text-gray-500">({product.reviews} reviews)</span>
//         </div>
//         <div className="text-2xl text-red-600 mb-4">${product.productPrice.toFixed(2)}</div>
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold mb-2">About This Item:</h2>
//           <p className="text-gray-700 mb-4">{product.productDescription}</p>
//           <ul className="text-gray-700 mb-4">
//             <li>Color: {product.color}</li>
//             <li>Available: {product.productQuantity}</li>
//             <li>Category: {product.productCategory}</li>
//           </ul>
//         </div>
//         {isOutStock && <div className="text-red-500 text-2xl">{error}</div>}
//         <div className="mb-4">
//           <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
//           <input type="number" id="quantity" name="quantity" value={quantity}
//             onChange={(e) => handleQuantityChange(e.target.value)}
//             min="1" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
//         </div>
//         <div className="flex gap-4 mb-4">
//           <button onClick={() => addToCart(product._id)}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-blue-600 transition-colors duration-200">
//             Add to Cart
//           </button>
//           <button onClick={buyNow}
//             className="bg-green-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-green-600 transition-colors duration-200">
//             Buy Now
//           </button>
//         </div>
//         <div className="flex items-center mt-4">
//           <span className="mr-4">Share At:</span>
//           <div className="flex space-x-2">
//             <i className="fab fa-facebook-f text-blue-700 cursor-pointer"></i>
//             <i className="fab fa-twitter text-blue-400 cursor-pointer"></i>
//             <i className="fab fa-instagram text-pink-500 cursor-pointer"></i>
//             <i className="fab fa-linkedin-in text-blue-600 cursor-pointer"></i>
//             <i className="fab fa-pinterest text-red-700 cursor-pointer"></i>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProductApi, addToCartApi } from '../../apis/Api';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import Modal from 'react-modal';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isOutStock, setIsOutStock] = useState(false);
  const [isTryOnActive, setIsTryOnActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const outputCanvasRef = useRef(null);

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        if (res.status === 201) {
          setProduct(res.data.product);
          updateStockStatus(res.data.product, quantity);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const updateStockStatus = (product, quantity) => {
    if (product.productQuantity < quantity) {
      setError("Out of Stock");
      setIsOutStock(true);
    } else {
      setError("");
      setIsOutStock(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity > quantity && isOutStock) {
      return;
    }
    setQuantity(newQuantity);
    if (product) {
      updateStockStatus(product, newQuantity);
    }
  };

  const addToCart = () => {
    if (!isOutStock && product && quantity > 0) {
      addToCartApi({ productId: product._id, quantity: quantity }).then((res) => {
        if (res.status === 201) {
          toast.success('Product added to cart');
        } else {
          toast.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Failed to add to cart');
      });
    }
  };

  const buyNow = () => {
    addToCart();
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const captureFrame = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (blob) {
        sendFrameToBackend(blob);
      }
    }, 'image/jpeg');
  };

  const sendFrameToBackend = async (blob) => {
    const formData = new FormData();
    formData.append('frame', blob, 'frame.jpg');

    try {
      const response = await axios.post('http://localhost:5001/process_frame', formData);
      drawGlasses(response.data);
    } catch (error) {
      console.error('Error sending frame to backend:', error);
    }
  };

  const drawGlasses = (data) => {
    const canvas = outputCanvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = 'data:image/png;base64,' + data.image;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    if (isTryOnActive) {
      startVideo();
      const intervalId = setInterval(captureFrame, 1000 / 60); // Capture frame at 30 FPS
      return () => clearInterval(intervalId);
    }
  }, [isTryOnActive]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    zIndex: 1000,
    width: '80%',
    maxWidth: '800px'
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999
  };

  const videoCanvasStyles = {
    width: '100%',
    maxWidth: '640px',
    height: 'auto'
  };

  const closeButtonStyles = {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={`http://localhost:5000/products/${product.productImage}`}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-md" />
          <div className="flex mt-4 space-x-2">
            {product.additionalImages && product.additionalImages.map((img, index) => (
              <img key={index} src={`http://localhost:5000/products/${img}`}
                alt={`Additional ${index}`}
                className="w-20 h-20 object-cover rounded-md cursor-pointer" />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
          <div className="flex items-center mb-2">
            <span className="text-blue-500 mr-2">Visit Store</span>
            <span className="text-yellow-500 mr-2">★ {product.rating}</span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>
          <div className="text-2xl text-red-600 mb-4">${product.productPrice.toFixed(2)}</div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">About This Item:</h2>
            <p className="text-gray-700 mb-4">{product.productDescription}</p>
            <ul className="text-gray-700 mb-4">
              <li>Color: {product.color}</li>
              <li>Available: {product.productQuantity}</li>
              <li>Category: {product.productCategory}</li>
            </ul>
          </div>
          {isOutStock && <div className="text-red-500 text-2xl">{error}</div>}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" id="quantity" name="quantity" value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              min="1" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
          </div>
          <div className="flex gap-4 mb-4">
            <button onClick={() => addToCart(product._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-blue-600 transition-colors duration-200">
              Add to Cart
            </button>
            <button onClick={buyNow}
              className="bg-green-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-green-600 transition-colors duration-200">
              Buy Now
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <button onClick={() => setIsTryOnActive(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md uppercase font-bold hover:bg-purple-600 transition-colors duration-200">
              Virtual Try On
            </button>
          </div>
          <div className="flex items-center mt-4">
            <span className="mr-4">Share At:</span>
            <div className="flex space-x-2">
              <i className="fab fa-facebook-f text-blue-700 cursor-pointer"></i>
              <i className="fab fa-twitter text-blue-400 cursor-pointer"></i>
              <i className="fab fa-instagram text-pink-500 cursor-pointer"></i>
              <i className="fab fa-linkedin-in text-blue-600 cursor-pointer"></i>
              <i className="fab fa-pinterest text-red-700 cursor-pointer"></i>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isTryOnActive}
        onRequestClose={() => setIsTryOnActive(false)}
        contentLabel="Virtual Try-On"
        style={{
          content: modalStyles,
          overlay: overlayStyles
        }}
      >
        <div className="modal-content" style={modalStyles}>
          <video ref={videoRef} className="video" width="640" height="480" autoPlay muted style={videoCanvasStyles}></video>
          <canvas ref={canvasRef} className="canvas" width="640" height="480" style={{ ...videoCanvasStyles, display: 'none' }}></canvas>
          <canvas ref={outputCanvasRef} className="output-canvas" width="640" height="480" style={videoCanvasStyles}></canvas>
          <button onClick={() => setIsTryOnActive(false)} className="close-button" style={closeButtonStyles}>Close</button>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetails;
