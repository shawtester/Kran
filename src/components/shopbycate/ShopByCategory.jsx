// components/categoryCarousel/CategoryCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css'; // Use the bundled CSS file
import { Link } from 'react-router-dom';
import CategoryImage1 from '../../assets/Images/Category1.png'; // Import local images
import CategoryImage2 from '../../assets/Images/Category2.png';
import CategoryImage3 from '../../assets/Images/Category3.png';
import CategoryImage4 from '../../assets/Images/Category4.png';
import CategoryImage5 from '../../assets/Images/Category5.png';

const categories = [
  {
    title: 'Whey',
    imageUrl: CategoryImage1,
    route: '/category/Whey',
  },
  {
    title: 'Isolated',
    imageUrl: CategoryImage2,
    route: '/category/Isolated',
  },
  {
    title: 'Creatine',
    imageUrl: CategoryImage4,
    route: '/category/Creatine',
  },
  {
    title: 'Pre-Workout',
    imageUrl: CategoryImage3,
    route: '/category/Pre-Workout',
  },
  {
    title: 'Gainers',
    imageUrl: CategoryImage5,
    route: '/category/Gainers',
  },
  // Add more categories as needed
];

const ShopByCategory = () => {
  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold mb-6 pl-9">Shop By Category</h2>
      <Swiper
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.route} className="relative">
            <Link to={category.route} className="w-full h-full block">
              <div className="flex-shrink-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-48 object-cover:conatin" // Corrected class name
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopByCategory;
