import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import SwiperCore, { Pagination } from 'swiper';

// Import local images
import img1 from '../../assets/Show/slide1.png';
import img2 from '../../assets/Show/slide2.png';
import img3 from '../../assets/Show/slide3.png';
import img4 from '../../assets/Show/slide4.png';
import img5 from '../../assets/Show/slide5.png';
import img6 from '../../assets/Show/slide6.png';
import img7 from '../../assets/Show/slide7.png';

// Swiper modules initialization
SwiperCore.use([Pagination]);

const CarouselComponent = () => {
  const slides = [
    { id: 1, img: img1, title: "DIGESTION" },
    { id: 2, img: img2, title: "HAIRLOSS" },
    { id: 3, img: img3, title: "MUSCLE RECOVERY" },
    { id: 4, img: img4, title: "HEALTHY AGING" },
    { id: 5, img: img5, title: "HAIRLOSS" },
    { id: 6, img: img6, title: "WEIGHT MANAGEMENT" },
    { id: 7, img: img7, title: "WEIGHT MANAGEMENT" },
  ];

  return (
    <div className="relative w-full mt-12 overflow-hidden" style={{ backgroundColor: '#e0f7fa' }}> {/* Light blue background */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Tackle Your Biggest Worries This Month
      </h2>

      <Swiper
        spaceBetween={15} // Space between slides
        slidesPerView={4}  // Show 4 images by default
        pagination={{ clickable: true }} // Enable pagination
        loop={true} // Enable infinite looping
        breakpoints={{
          320: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden mx-2" style={{ backgroundColor: '#e0f7fa' }}>
              {/* Image */}
              <div className="w-full h-64 p-2 flex items-center justify-center bg-white"> {/* Ensure background is white to see the effect */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-contain" // Keep this for better scaling
                  style={{ backgroundColor: 'transparent' }} // Set transparent background for the image
                />
              </div>
              
              {/* Title */}
              <div className="p-4 bg-gray-800 text-white w-full text-center">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
