import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For back navigation and checking current path
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './certi.css'; // Import custom styles

// Import local images
import cert1 from '../../assets/certificates/certificate1.jpg';
import cert2 from '../../assets/certificates/certificate2.jpg';
import cert3 from '../../assets/certificates/certificate3.jpg';

// Sample certificate data
const certificates = [
  { id: 1, title: 'Certificate of Achievement', img: cert1 },
  { id: 2, title: 'Certificate of Excellence', img: cert2 },
  { id: 3, title: 'Certificate of Excellence', img: cert3 },
];

const CertificateCarousel = () => {
  const navigate = useNavigate(); // Hook to navigate back
  const location = useLocation(); // Hook to get the current location

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Check if the state exists, meaning user came from a link
  const cameFromLink = location.state?.fromLink;

  return (
    <div className="certificate-carousel py-10">
      {/* Conditionally render Back Button if user came from a link */}
      {cameFromLink && (
        <button
          onClick={handleBack}
          className="mb-4 ml-4 px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          ⬅ Back
        </button>
      )}

      <h2 className="text-3xl font-extrabold text-center mb-6">Our Certificates</h2>
      
      <Swiper
        spaceBetween={30}
        slidesPerView={1} // Always show one slide
        navigation
        pagination={{ clickable: true }}
      >
        {certificates.map((cert) => (
          <SwiperSlide key={cert.id} className="swiper-slide">
            <div className="certificate-card p-4 bg-white shadow-lg rounded-xl text-center border-4 border-transparent hover:border-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out">
              <img src={cert.img} alt={cert.title} className="certificate-image mb-4 rounded-lg" />
              <h3 className="certificate-title text-xl font-semibold text-gray-800">
                {cert.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CertificateCarousel;
