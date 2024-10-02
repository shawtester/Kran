import React, { useEffect, useState, Suspense, lazy, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = lazy(() => import('./Speed'));

const ProductCart = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);  // Track current slide index
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null); // Create a ref for the slider instance




  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productQuery = category
        ? query(collection(fireDB, "products"), where("category", "==", category))
        : query(collection(fireDB, "products"));
      const querySnapshot = await getDocs(productQuery);
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(allProducts);
      
      
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    
    fetchProducts();
    
  }, [category]);
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Move to the first slide after loading
    }
  }, [products]);


  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(productToAdd));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Custom arrow components with dynamic visibility
  const NextArrow = ({ onClick }) => (
    <div
      className={`absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer ${currentIndex === products.length - 4 ? 'hidden' : ''}`}
      onClick={onClick}
    >
      <button className="bg-blue-500 p-2 rounded-full text-white">→</button>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className={`absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer ${currentIndex === 0 ? 'hidden' : ''}`}
      onClick={onClick}
    >
      <button className="bg-blue-500 p-2 rounded-full text-white">←</button>
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setCurrentIndex(current),  // Update currentIndex after slide change
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-8 relative">
      <h2 className="text-left text-2xl font-bold mb-4 ml-12">
        {category ? `Products in ${category}` : "All Products"}
      </h2>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-2xl font-extrabold text-gray-800">We Are Finding the Best Products for You</p>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products.length === 0 ? (
        <p>No products available for category {category}</p>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Slider {...settings} ref={sliderRef}> {/* Attach ref to Slider */}
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </Slider>
        </Suspense>
      )}
    </div>
  );
};

export default ProductCart;
