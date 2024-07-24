import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProductApi, addToCartApi, addReviewApi, getReviewsApi, getReviewsByProductAndUserApi } from '../../apis/Api';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import Modal from 'react-modal';
import axios from 'axios';
import { Star, ShoppingCart, CreditCard, Camera, Share2, X } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isOutStock, setIsOutStock] = useState(false);
  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const[reviews,setReviews]=useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const[reviewChange,setReviewChange]=useState(false);

  const[ownReview,setOwnReview]=useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const outputCanvasRef = useRef(null);

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        if (res.status === 201) {
          setProduct(res.data.product);
          setMainImage(res.data.product.productImage);
          updateStockStatus(res.data.product, quantity);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load product details');
      });
  }, [id]);

  // get reviews
  useEffect(() => {
    getReviewsApi(id)
      .then((res) => {
        if (res.status === 200) {
          setReviews(res.data.reviews);
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error('Failed to load reviews');
      });
  }, [id,reviewChange]);

  useEffect(() => {
    getReviewsByProductAndUserApi(id)
      .then((res) => {
        if (res.status === 200) {
          setOwnReview(res.data.review);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id,reviewChange]);

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
    // Add navigation to checkout or any other logic for immediate purchase
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing the camera: ", err);
        toast.error('Failed to access camera');
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
      toast.error('Virtual try-on processing failed');
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
      const intervalId = setInterval(captureFrame, 1000 / 30); // Capture frame at 30 FPS
      return () => {
        clearInterval(intervalId);
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [isTryOnActive]);


const handleReviewSubmit = async (event) => {
  event.preventDefault(); 

  if (!rating || !review) {
    toast.error('Please ensure all fields are filled correctly.');
    return;
  }

  addReviewApi({ productId: product._id, rating, review })
    .then((response) => {
      if (response.status === 201) {
        toast.success(response.data.message);
        setShowReviewForm(false);

        // Refresh product data to show updated reviews
        setReviewChange(!reviewChange);
      } else {
        return Promise.reject(response.data.message || 'Unexpected error occurred');
      }
    })
    .then((productResponse) => {
      if (productResponse.status === 201) {
        setProduct(productResponse.data.product);
      } else {
        return Promise.reject('Failed to load updated product details');
      }
    })
    .catch((error) => {
      if(error.response){
        if(error.response.status===400){
          toast.error(error.response.data.message);
        }
        else{
          toast.error('Error Occured');
        }

      }
      
    });
};


  

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-4">
              <div className="relative pb-[100%] mb-4">
                <img
                  src={`http://localhost:5000/products/${mainImage}`}
                  alt={product.productName}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <img
                  src={`http://localhost:5000/products/${product.productImage}`}
                  alt={product.productName}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition"
                  onClick={() => setMainImage(product.productImage)}
                />
                {product.additionalImages && product.additionalImages.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/products/${img}`}
                    alt={`Additional ${index}`}
                    className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition"
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.productName}</h1>
              <div className="flex items-center mb-4">
  
              <div className="mb-4">
              {ownReview && (
                <div key={ownReview._id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= ownReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                </div>
                <p className="text-gray-700">{ownReview.review}</p> 
              </div>
              )
                }

              
  

      </div>

              </div>
              <div className="text-3xl font-bold text-blue-600 mb-6">${product.productPrice.toFixed(2)}</div>
              <p className="text-gray-600 mb-6">{product.productDescription}</p>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Product Details:</h2>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Color: {product.color}</li>
                  <li>Available: {product.productQuantity}</li>
                  <li>Category: {product.productCategory}</li>
                </ul>
              </div>
              {isOutStock && <div className="text-red-500 text-xl mb-4">{error}</div>}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                  disabled={isOutStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={buyNow}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-md font-bold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                  disabled={isOutStock}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </button>
              </div>
              <button
                onClick={() => setIsTryOnActive(true)}
                className="w-full bg-purple-500 text-white px-6 py-3 rounded-md font-bold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center mb-6"
              >
                <Camera className="w-5 h-5 mr-2" />
                Virtual Try On
              </button>
              <div className="flex items-center">
                <span className="mr-4 text-gray-600">Share:</span>
                <div className="flex space-x-4">
                  <Share2 className="w-5 h-5 text-blue-600 cursor-pointer" />
                  <i className="fab fa-facebook-f text-blue-600 cursor-pointer"></i>
                  <i className="fab fa-twitter text-blue-400 cursor-pointer"></i>
                  <i className="fab fa-instagram text-pink-500 cursor-pointer"></i>
                  <i className="fab fa-pinterest text-red-600 cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {reviews&&reviews.length>0?(
          reviews.map((review, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          )))
          :<p className="text-gray-600">No reviews yet</p>}
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200"
          >
            Write a Review
          </button>
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Write Your Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  rows="4"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Write your review here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 rounded-md font-bold hover:bg-green-600 transition-colors duration-200"
                onClick={handleReviewSubmit}
              >
                Submit Review
                </button>
            </form>
          )}
        </div>
      </div>

      {/* Virtual Try-On Modal */}
      <Modal
        isOpen={isTryOnActive}
        onRequestClose={() => setIsTryOnActive(false)}
        contentLabel="Virtual Try-On"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto relative">
          <button
            onClick={() => setIsTryOnActive(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">Virtual Try-On</h2>
          <div className="relative mb-4">
            <video ref={videoRef} className="w-full rounded-lg" autoPlay muted playsInline></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <canvas ref={outputCanvasRef} className="absolute inset-0 w-full h-full rounded-lg"></canvas>
          </div>
          <p className="text-sm text-gray-600 text-center mb-4">
            Please allow camera access to use the virtual try-on feature.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails