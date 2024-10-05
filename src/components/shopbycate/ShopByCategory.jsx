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
import CategoryImage6 from '../../assets/Images/Category6.png';
import CategoryImage7 from '../../assets/Images/Category7.png';
import CategoryImage8 from '../../assets/Images/Category8.png';
import CategoryImage9 from '../../assets/Images/Category9.png';
import CategoryImage10 from '../../assets/Images/Category10.png';
import CategoryImage11 from '../../assets/Images/Category11.png';



const categories = [
  {
    title: 'Whey',
    imageUrl: CategoryImage1,
    route: '/category/Whey',
  },
  {
    title: 'Whey-Isolate',
    imageUrl: CategoryImage2,
    route: '/category/Whey-Isolate',
  },
  {
    title: 'Creatine',
    imageUrl: CategoryImage4,
    route: '/category/Creatine',
  },
  {
    title: 'Pre-Workout',
    imageUrl: CategoryImage5,
    route: '/category/Pre-Workout',
  },
  {
    title: 'Gainers',
    imageUrl: CategoryImage3,
    route: '/category/Gainers',
  },
  {
    title: 'Omega3',
    imageUrl: CategoryImage6,
    route: '/category/Omega3',
  },
  {
    title: 'BCAA-Aminos',
    imageUrl: CategoryImage7,
    route: '/category/BCAA-Aminos',
  },
  {
    title: 'Weight-Loss',
    imageUrl: CategoryImage8,
    route: '/category/Weight-Loss',
  },
  {
    title: 'Multi-Vitamins',
    imageUrl: CategoryImage9,
    route: '/category/Multi-Vitamins',
  },
  {
    title: 'Glutamine',
    imageUrl: CategoryImage10,
    route: '/category/Glutamine',
  },
  {
    title: 'Nitrix-Oxide',
    imageUrl: CategoryImage11,
    route: '/category/Nitrix-Oxide',
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
