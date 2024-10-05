import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './Product.css'; // External CSS for the zoom box

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(localStorage.getItem(`selectedWeight-${id}`) || null);
  const [selectedFlavor, setSelectedFlavor] = useState(localStorage.getItem(`selectedFlavor-${id}`) || null);
  const [mainImage, setMainImage] = useState(null);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', id);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setMainImage(productData.imageUrls[0]);

          if (!selectedWeight) {
            setSelectedWeight(productData.weight1);
            localStorage.setItem(`selectedWeight-${id}`, productData.weight1);
          }
          if (!selectedFlavor) {
            setSelectedFlavor(productData.flavour1);
            localStorage.setItem(`selectedFlavor-${id}`, productData.flavour1);
          }
        } else {
          console.log(`Product with ID ${id} does not exist.`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id, selectedWeight, selectedFlavor]);

  const handleAddToCart = () => {
    if (product && selectedWeight && selectedFlavor) {
      const priceToUse = product.price1;
      dispatch(addToCart({
        ...product,
        price: priceToUse,
        flavour: selectedFlavor,
        weight: selectedWeight,
        quantity,
      }));
    }
  };

  const handleWeightSelect = (weight) => {
    setSelectedWeight(weight);
    localStorage.setItem(`selectedWeight-${id}`, weight);
  };

  const handleFlavorSelect = (flavor) => {
    setSelectedFlavor(flavor);
    localStorage.setItem(`selectedFlavor-${id}`, flavor);
  };

  const handleMouseEnter = () => {
    setZoomVisible(true);
  };

  const handleMouseLeave = () => {
    setZoomVisible(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((touch.pageX - left) / width) * 100;
    const y = ((touch.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="text-sm md:text-base">Back</span>
          </button>

          <div className="lg:w-4/5 mx-auto flex flex-wrap flex-col md:flex-row">
            {/* Left Side with Main Image */}
            <div className="md:w-1/2 w-full flex flex-col items-center">
              <div
                className="relative w-full h-auto md:w-[500px] md:h-[500px] max-w-full flex items-center justify-center mb-4 mt-6 md:mt-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}  // For mobile zoom handling
                onTouchStart={handleMouseEnter}  // Show zoom on touch start
                onTouchEnd={handleMouseLeave}    // Hide zoom on touch end
              >
                <img
                  src={mainImage}
                  alt={product.title}
                  className="object-contain w-full h-full max-w-full max-h-full rounded-md border-4 border-gray-300"
                />

                {/* Zoomed Image beside the main image */}
                {zoomVisible && (
                  <div className="absolute right-0 top-0 md:ml-4 bg-white border border-gray-300 p-2 shadow-lg zoom-container">
                    <div
                      style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '250%', // Increase to zoom in more
                        width: '300px',  // Adjust width of the zoom box
                        height: '300px', // Adjust height of the zoom box
                      }}
                      className="zoom-box"
                    ></div>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.imageUrls?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="object-cover w-48 h-48 cursor-pointer mb-1 border border-gray-300 rounded-md hover:opacity-75 transition duration-300"
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Details on the Right Side */}
            <div className="md:w-1/2 w-full md:pl-10 flex flex-col">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-1">{product.title}</h1>
              <p className="leading-relaxed border-b-2 mb-5 pb-5">{product.description}</p>

              <div className="flex items-center mb-4">
                <span className="title-font font-medium text-xl md:text-2xl text-gray-900">₹{product.price1}</span>
                {product.price2 && (
                  <span className="text-red-500 ml-4 text-lg line-through">₹{product.price2}</span>
                )}
              </div>

              {/* Selectable Weight Buttons */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Select Weight:</h3>
                <div className="flex space-x-2">
                  {product.weight1 && (
                    <button
                      onClick={() => handleWeightSelect(product.weight1)}
                      className={`px-4 py-2 rounded ${selectedWeight === product.weight1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.weight1}
                    </button>
                  )}
                  {product.weight2 && (
                    <button
                      onClick={() => handleWeightSelect(product.weight2)}
                      className={`px-4 py-2 rounded ${selectedWeight === product.weight2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.weight2}
                    </button>
                  )}
                </div>
              </div>

              {/* Selectable Flavor Buttons */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Select Flavor:</h3>
                <div className="flex space-x-2">
                  {product.flavour1 && (
                    <button
                      onClick={() => handleFlavorSelect(product.flavour1)}
                      className={`px-4 py-2 rounded ${selectedFlavor === product.flavour1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.flavour1}
                    </button>
                  )}
                  {product.flavour2 && (
                    <button
                      onClick={() => handleFlavorSelect(product.flavour2)}
                      className={`px-4 py-2 rounded ${selectedFlavor === product.flavour2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.flavour2}
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Quantity:</h3>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className="w-16 border border-gray-300 rounded-md p-2"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
