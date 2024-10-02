import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/cartSlice';
import Layout from '../../components/layout/Layout';

SwiperCore.use([Navigation, Pagination, Mousewheel]);

const VerticalPriceDropsSlider = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // Retrieve selected options from local storage on mount
  useEffect(() => {
    const storedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    setSelectedOptions(storedOptions);

    if (window.innerWidth > 1024) {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const productsRef = collection(fireDB, 'products');
        const q = categoryName ? query(productsRef, where('category', '==', categoryName)) : productsRef;
        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, [categoryName, navigate]);

  // Persist selected options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  // Add product to cart with the selected options
  const handleAddToCart = (product) => {
    const selectedOption = selectedOptions[product.id] || {};
    const priceToUse = product.price1;

    dispatch(
      addToCart({
        ...product,
        ...selectedOption,
        quantity: 1,
        price: priceToUse,
      })
    );
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // Update the selected options state
  const handleOptionChange = (productId, type, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [productId]: {
        ...prevOptions[productId],
        [type]: value,
      },
    }));
  };

  return (
    <Layout>
      <div className="relative w-full h-[500px] overflow-hidden bg-white">
        <Swiper
          direction="vertical"
          spaceBetween={10}
          slidesPerView={1}
          mousewheel={true}
          grabCursor={true}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {products.map((product) => {
            const inCart = cartItems.find((item) => item.id === product.id);
            const selectedOption = selectedOptions[product.id] || {};

            return (
              <SwiperSlide key={product.id} className="flex flex-col justify-between p-2 bg-gray-100 rounded-lg shadow-md h-[90%]">
                {/* Product Image */}
                <h1 className="text-gray-700 block hover:text-red-500 font-bold transition duration-300">Product's In {categoryName}</h1>
                <div className="w-full h-[40%]">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.title}
                    className="w-full h-full object-cover:contain rounded"
                  />
                </div>

                {/* Product Title and Description */}
                <div className="text-center mt-2">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-700 text-sm line-clamp-2 mt-1">{product.description}</p>
                </div>

                {/* Selectable Flavor Buttons */}
                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-700">Select Flavor:</h3>
                  <div className="flex space-x-2">
                    {product.flavour1 && (
                      <button
                        onClick={() => handleOptionChange(product.id, 'flavor', product.flavour1)}
                        className={`px-2 py-1 rounded ${selectedOption.flavor === product.flavour1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {product.flavour1}
                      </button>
                    )}
                    {product.flavour2 && (
                      <button
                        onClick={() => handleOptionChange(product.id, 'flavor', product.flavour2)}
                        className={`px-2 py-1 rounded ${selectedOption.flavor === product.flavour2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {product.flavour2}
                      </button>
                    )}
                  </div>
                </div>

                {/* Selectable Weight Buttons */}
                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-700">Select Weight:</h3>
                  <div className="flex space-x-2">
                    {product.weight1 && (
                      <button
                        onClick={() => handleOptionChange(product.id, 'weight', product.weight1)}
                        className={`px-2 py-1 rounded ${selectedOption.weight === product.weight1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {product.weight1}
                      </button>
                    )}
                    {product.weight2 && (
                      <button
                        onClick={() => handleOptionChange(product.id, 'weight', product.weight2)}
                        className={`px-2 py-1 rounded ${selectedOption.weight === product.weight2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {product.weight2}
                      </button>
                    )}
                  </div>
                </div>

                {/* Add to Cart / Quantity Controls */}
                <div className="flex items-center justify-center mt-2">
                  {inCart ? (
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        disabled={inCart.quantity <= 1}
                        className="px-4 py-2 bg-red-500 text-white rounded-l-lg hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-gray-200">{inCart.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Layout>
  );
};

export default VerticalPriceDropsSlider;
