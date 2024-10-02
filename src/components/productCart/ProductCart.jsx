import React, { useEffect, useState, Suspense, lazy } from "react";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index

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
    currentIndex < products.length - 1 && ( // Show next arrow only if not on the last slide
      <div
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full p-1 shadow-md"
        onClick={onClick}
      >
        <span className="text-gray-800">→</span>
      </div>
    )
  );

  const PrevArrow = ({ onClick }) => (
    currentIndex > 0 && ( // Show previous arrow only if not on the first slide
      <div
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full p-1 shadow-md"
        onClick={onClick}
      >
        <span className="text-gray-800">←</span>
      </div>
    )
  );

  const settings = {
    dots: false,
    infinite: false, // Change to false for controlled navigation
    speed: 500,
    slidesToShow: 1, // Start with 1 item on mobile
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setCurrentIndex(current), // Update currentIndex after slide change
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, // Show 1 item on mobile
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 items on tablets
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 items on larger screens
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4, // Show 4 items on large screens
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
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="p-2">
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => handleProductClick(product.id)} // Make the whole card clickable
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
