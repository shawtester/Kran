import React from 'react';
import './Test.css'; // Import external CSS

// Testimonial Component
const Testimonial = ({ name, message }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg testimonial-card">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-800">{message}</p>
    </div>
  );
};

// TestimonialPage Component
const TestimonialPage = () => {
  // Static testimonial data
  const testimonials = [
    {
      name: 'Priya Patel',
      message: "I'm so impressed with the quality of supplements I received from Supplement Adda. Not only did they help me achieve my fitness goals faster, but their prompt delivery and helpful customer support made the whole experience seamless. Thank you, Supplement Adda!",
    },
    {
      name: 'Amit Sharma',
      message: "Supplement Adda exceeded my expectations in every way. From their informative website to the premium-quality products they offer, I couldn't be happier with my experience. I'll definitely be a returning customer.",
    },
    {
      name: 'Kavita Singh',
      message: "I've tried many supplement brands in the past, but none compare to Supplement Adda. Their products are effective, reasonably priced, and the customer service is exceptional. I'm grateful to have found such a reliable source for my fitness needs.",
    },
    {
      name: 'Sandeep Gupta',
      message: "Supplement Adda has been a game-changer for me. Their supplements have helped me push past my plateaus and achieve new personal bests in my workouts. I can't thank them enough for their commitment to quality and customer satisfaction.",
    },
    {
      name: 'Anjali Desai',
      message: "As a fitness enthusiast, I'm always on the lookout for high-quality supplements, and Supplement Adda delivers exactly that. Their diverse range of products caters to all my needs, and their attention to detail sets them apart. I'm a loyal customer for life.",
    },
    {
      name: 'Rajesh Kumar',
      message: "Supplement Adda has been my go-to for all my fitness needs. Their wide range of products and excellent customer service make them stand out from the rest. I highly recommend them to anyone serious about their health and fitness journey.",
    },
    {
      name: 'Ravi Mehta',
      message: "I've tried various supplement companies, but none compare to Supplement Adda. Their products are top-notch and have made a significant difference in my fitness journey. The delivery was quick, and the support team was incredibly helpful. Highly recommended!",
    },
    {
      name: 'Neha Verma',
      message: "Supplement Adda has truly transformed my approach to fitness. The quality of their supplements is outstanding, and the user-friendly website made ordering a breeze. I'm extremely satisfied with my purchases and will continue to shop here.",
    },
    {
      name: 'Vikram Reddy',
      message: "Finding reliable supplements has always been a challenge for me, but Supplement Adda has made it easy. Their product selection is impressive, and I've noticed a marked improvement in my performance since I started using their products. A trustworthy brand!",
    },
    {
      name: 'Sneha Joshi',
      message: "Supplement Adda is my secret weapon for fitness success! Their supplements work wonders, and the customer service is second to none. I appreciate their commitment to quality and their dedication to customer satisfaction.",
    },
    {
      name: 'Karan Singh',
      message: "I've been a loyal customer of Supplement Adda for over a year now, and I couldn't be happier. Their high-quality supplements and excellent customer service have kept me coming back. I'm always excited to try their new products!",
    },
    {
      name: 'Pooja Bansal',
      message: "Supplement Adda has changed the way I view supplements. Their products are effective, affordable, and the customer support team is always there to help. I'm grateful for such a reliable partner in my fitness journey.",
    },
  ];

  return (
    <div className="bg-red-400 p-8 testimonial-page"> {/* Added testimonial-page class */}
      <h1 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h1>
      <div className="hidden md:flex testimonial-container">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            name={testimonial.name}
            message={testimonial.message}
          />
        ))}
      </div>
      <div className="md:hidden testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            name={testimonial.name}
            message={testimonial.message}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialPage;
