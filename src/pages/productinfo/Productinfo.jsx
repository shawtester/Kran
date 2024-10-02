import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Layout from '../../components/layout/Layout';
import { fireDB } from '../../firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { AiOutlineTool, AiOutlineInfoCircle, AiOutlineFileText } from 'react-icons/ai';
import { GiFactory } from 'react-icons/gi';

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(localStorage.getItem(`selectedWeight-${id}`) || null);
  const [selectedFlavor, setSelectedFlavor] = useState(localStorage.getItem(`selectedFlavor-${id}`) || null);
  const [mainImage, setMainImage] = useState(null); // State to hold the main image
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
          setMainImage(productData.imageUrls[0]); // Set the first image as the main image initially

          // Only set the initial weight and flavor if none is selected
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
      const priceToUse = product.price1; // Adjust based on selected attributes
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
    localStorage.setItem(`selectedWeight-${id}`, weight); // Save selected weight to localStorage
  };

  const handleFlavorSelect = (flavor) => {
    setSelectedFlavor(flavor);
    localStorage.setItem(`selectedFlavor-${id}`, flavor); // Save selected flavor to localStorage
  };

  const handleImageClick = (image) => {
    setMainImage(image); // Set the clicked thumbnail image as the main image
  };

  const staticData = {
    howToUse: "Use this product by mixing one scoop with 8-10 oz of water or milk. Shake well and enjoy.",
    productInfo: "This is a high-quality product designed for fitness enthusiasts. It includes essential nutrients and vitamins.",
    additionalInfo: "For best results, use in conjunction with a balanced diet and regular exercise.",
    manufacturerInfo: "Manufactured by XYZ Company, known for its commitment to quality and customer satisfaction.",
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
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
            {/* Left Side with Main Image and Thumbnails */}
            <div className="md:w-1/2 w-full flex">
              <div className="flex flex-col space-y-2 mr-4">
                <div className="border rounded-md p-2">
                  {product.imageUrls?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="object-cover:conatin w-48 h-32 cursor-pointer mb-2" // Added mb-2 for spacing
                      onClick={() => handleImageClick(image)} // Handle click event
                    />
                  ))}
                </div>
              </div>
              <div className="relative w-full h-96 max-w-lg overflow-hidden">
                <img
                  src={mainImage} // Use the selected main image
                  alt={product.title}
                  className="object-cover:contain w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* Details on the Right Side */}
            <div className="md:w-1/2 w-full md:pl-10 flex flex-col">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-1">{product.title}</h1>

              <p className="leading-relaxed border-b-2 mb-5 pb-5 text-sm md:text-base">{product.description}</p>

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

              {/* Quantity Control */}
              <div className="flex items-center mb-4">
                <button
                  onClick={decreaseQuantity}
                  className="border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="mx-4 text-lg">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Add To Cart
              </button>

              {/* Additional Product Info Sections */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700 flex items-center">
                  <AiOutlineTool className="mr-2" /> How to Use
                </h3>
                <p className="text-gray-600">{staticData.howToUse}</p>

                <h3 className="text-lg font-medium text-gray-700 flex items-center mt-4">
                  <AiOutlineInfoCircle className="mr-2" /> Product Information
                </h3>
                <p className="text-gray-600">{staticData.productInfo}</p>

                <h3 className="text-lg font-medium text-gray-700 flex items-center mt-4">
                  <AiOutlineFileText className="mr-2" /> Additional Information
                </h3>
                <p className="text-gray-600">{staticData.additionalInfo}</p>

                <h3 className="text-lg font-medium text-gray-700 flex items-center mt-4">
                  <GiFactory className="mr-2" /> Manufacturer Info
                </h3>
                <p className="text-gray-600">{staticData.manufacturerInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
