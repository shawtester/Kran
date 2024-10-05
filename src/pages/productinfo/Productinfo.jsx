import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './Product.css'; // External CSS for animation and styles

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(localStorage.getItem(`selectedWeight-${id}`) || null);
  const [selectedFlavor, setSelectedFlavor] = useState(localStorage.getItem(`selectedFlavor-${id}`) || null);
  const [mainImage, setMainImage] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifyPos, setMagnifyPos] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch product details from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', id);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setMainImage(productData.imageUrls[0]);

          // Initialize weight and flavor selection from product data
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

  // Handle adding product to the cart with selected flavor, weight, and quantity
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

  // Handle weight selection
  const handleWeightSelect = (weight) => {
    setSelectedWeight(weight);
    localStorage.setItem(`selectedWeight-${id}`, weight);
  };

  // Handle flavor selection
  const handleFlavorSelect = (flavor) => {
    setSelectedFlavor(flavor);
    localStorage.setItem(`selectedFlavor-${id}`, flavor);
  };

  // Handle image hover or touch with animation effect
  const handleImageMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / e.target.offsetWidth) * 100;
    const y = (offsetY / e.target.offsetHeight) * 100;
    setMagnifyPos({ x, y });
    setIsMagnifying(true);
  };

  const handleImageTouchMove = (e) => {
    const touch = e.touches[0];
    const target = e.currentTarget;
    const { width, height } = target.getBoundingClientRect();
    const x = ((touch.clientX - target.offsetLeft) / width) * 100;
    const y = ((touch.clientY - target.offsetTop) / height) * 100;
    setMagnifyPos({ x, y });
    setIsMagnifying(true);
  };

  const handleImageMouseLeave = () => {
    setIsMagnifying(false);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  // Loading state before product data is fetched
  if (!product) return <p>Loading...</p>;

  const isDescriptionLong = product.description.length > 500;

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackButtonClick}
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
              {/* Main Image Container */}
              <div className="relative w-full h-auto md:w-[700px] md:h-[500px] max-w-full flex items-start justify-center mb-4 mt-6 md:mt-0">
                <img
                  src={mainImage}
                  alt={product.title}
                  className={`object-contain w-full h-full max-w-full max-h-full rounded-md border-4 border-gray-300`}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  onTouchMove={handleImageTouchMove}
                  onTouchEnd={() => setIsMagnifying(false)}
                />
                {isMagnifying && (
                  <div
                    className="absolute border-2 border-gray-300 w-[400px] h-[400px] overflow-hidden top-0 right-[-450px] z-10 bg-white"
                    style={{
                      backgroundImage: `url(${mainImage})`,
                      backgroundSize: '400%', // Adjust this value for zoom level
                      backgroundPosition: `${magnifyPos.x}% ${magnifyPos.y}%`, // Align zoom to start from the right
                    }}
                  />
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
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>

            {/* Details on the Right Side */}
            <div className="md:w-1/2 w-full md:pl-10 flex flex-col">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-1">{product.title}</h1>

              {/* Description with "Read More" button */}
              <p className={`leading-relaxed border-b-2 mb-5 pb-5 text-sm md:text-base ${showFullDescription ? '' : 'max-h-36 overflow-hidden'}`}>
                {product.description}
              </p>
              {isDescriptionLong && (
                <button
                  onClick={toggleDescription}
                  className="text-indigo-500 text-sm hover:underline"
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}

              {/* Price and Discounted Price */}
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
                      className={`bg-gray-200 px-4 py-2 rounded-md ${selectedWeight === product.weight1 ? 'bg-indigo-500 text-white' : 'text-gray-700'}`}
                    >
                      {product.weight1}
                    </button>
                  )}
                  {product.weight2 && (
                    <button
                      onClick={() => handleWeightSelect(product.weight2)}
                      className={`bg-gray-200 px-4 py-2 rounded-md ${selectedWeight === product.weight2 ? 'bg-indigo-500 text-white' : 'text-gray-700'}`}
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
                      className={`bg-gray-200 px-4 py-2 rounded-md ${selectedFlavor === product.flavour1 ? 'bg-indigo-500 text-white' : 'text-gray-700'}`}
                    >
                      {product.flavour1}
                    </button>
                  )}
                  {product.flavour2 && (
                    <button
                      onClick={() => handleFlavorSelect(product.flavour2)}
                      className={`bg-gray-200 px-4 py-2 rounded-md ${selectedFlavor === product.flavour2 ? 'bg-indigo-500 text-white' : 'text-gray-700'}`}
                    >
                      {product.flavour2}
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4">
                <span className="mr-4">Quantity:</span>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-md w-16 text-center"
                  min="1"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
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
