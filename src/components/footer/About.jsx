import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-100 to-white text-gray-900 py-20">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Title */}
          <h1 className="text-6xl font-extrabold text-blue-900 mb-10 text-center">
            About Us
          </h1>

          {/* Company Introduction */}
          <p className="text-lg mb-8 text-center leading-relaxed max-w-3xl mx-auto">
  Welcome to Supplement Adda, your trusted source for premium sports nutrition and wellness products. 
  At Supplement Adda, we believe that achieving your health and fitness goals begins with the right nutrition. 
  Our mission is to empower individuals—whether you’re a seasoned athlete, a fitness enthusiast, or just starting your wellness journey—by providing the highest quality supplements that cater to your unique needs. 

  We understand the challenges of navigating the world of sports nutrition, which is why we are dedicated to curating a diverse range of products that are not only effective but also safe and reliable. From whey protein and whey isolates to gainers and specialized products, we offer a comprehensive selection designed to support every aspect of your fitness regimen.

  What sets us apart is our commitment to quality and transparency. Every product we offer undergoes rigorous testing to ensure it meets our high standards of purity and potency. Our team is passionate about helping you succeed, and we strive to provide you with the knowledge and resources necessary to make informed choices. 

  At Supplement Adda, we’re not just about selling supplements; we’re about building a community of health-conscious individuals who are motivated to live their best lives. Join us in our mission to transform lives through nutrition, and together, let’s achieve greatness!
</p>


          {/* Our Mission */}
          <div className="bg-white shadow-lg rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              At Supplement Adda, we believe in the power of nutrition to transform lives. Our mission is to provide cutting-edge, science-backed supplements that help athletes, fitness enthusiasts, and everyday people unlock their potential.
              From increasing muscle mass to aiding recovery, we ensure that every product we offer is made from the finest ingredients and meets the highest standards of quality.
            </p>
          </div>

          {/* Our Products */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-10 mb-12">
  <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Our Products</h2>
  <p className="text-lg md:text-xl text-gray-700 mb-6">
    We specialize in a wide range of products designed to support your fitness journey:
  </p>
  <ul className="list-disc list-inside text-lg md:text-xl text-gray-700 space-y-3 pl-6">
    <li><strong>Whey Protein:</strong> Ideal for post-workout recovery, promoting muscle repair and growth.</li>
    <li><strong>Whey Isolates:</strong> A purer form of whey protein, with higher protein content and minimal fats or carbs, perfect for lean muscle building.</li>
    <li><strong>Mass Gainers:</strong> Designed to help individuals increase muscle mass and weight, combining high-quality protein with complex carbohydrates.</li>
    <li><strong>Pre-Workouts:</strong> Give yourself a performance boost before hitting the gym with our range of pre-workout supplements.</li>
    <li><strong>Post-Workout Supplements:</strong> Aid your body's recovery process with supplements rich in essential nutrients.</li>
    <li><strong>Nitric Oxide:</strong> Supports blood flow and enhances nutrient delivery to muscles, improving workout performance and endurance.</li>
    <li><strong>Glutamine:</strong> Essential for muscle recovery and immune support, helping reduce muscle soreness after intense training.</li>
    <li><strong>Omega-3:</strong> Promotes heart health and reduces inflammation, providing essential fatty acids that support overall wellness.</li>
  </ul>
</div>


          {/* Our Story */}
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Our Story</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Supplement Adda began with a simple mission – to make high-quality sports nutrition products accessible to everyone. Our founders, fitness enthusiasts themselves, struggled to find reliable supplements that met their needs, and so they decided to create their own platform. From humble beginnings to a thriving business, we've stayed committed to offering only the best supplements to help others achieve their health and fitness goals.
            </p>
          </div>

          {/* Customer Testimonials */}
          <div className="bg-white shadow-lg rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">What Our Customers Say</h2>
            <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-md shadow">
                <p className="text-xl text-gray-700 italic">"I've been using Supplement Adda products for over a year now, and I've seen amazing results in my fitness journey!"</p>
                <p className="text-right text-blue-700 font-bold mt-4">- Rajesh Singh</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-md shadow">
                <p className="text-xl text-gray-700 italic">"Their whey protein is the best on the market, and I love their quick shipping!"</p>
                <p className="text-right text-blue-700 font-bold mt-4">- Karan Rudola</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Why Choose Us?</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              At Supplement Adda, we are dedicated to offering more than just products. Here’s why our customers choose us:
            </p>
            <ul className="list-disc list-inside text-lg md:text-xl text-gray-700 space-y-3 pl-6">
              <li><strong>Uncompromising Quality:</strong> Every product is tested and verified for purity and potency.</li>
              <li><strong>Expert Support:</strong> Our team of nutrition experts is here to guide you.</li>
              <li><strong>Fast Delivery:</strong> Enjoy quick and reliable shipping to get your supplements when you need them.</li>
              <li><strong>Customer-Centered:</strong> We put our customers first in everything we do.</li>
            </ul>
          </div>

          {/* Our Partners */}
          <div className="bg-white shadow-lg rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Our Partners</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              We are proud to collaborate with some of the most trusted names in the fitness and supplement industry. Together, we ensure that you get access to the best products available in the market.
            </p>
          </div>

          {/* Commitment to Quality */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Our Commitment to Quality</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              We take great pride in the quality of our products. Every item we sell undergoes strict quality control measures to ensure safety and effectiveness.
            </p>
          </div>

          {/* Our Customers */}
          <div className="bg-white shadow-lg rounded-lg p-10 mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Our Customers</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We are committed to delivering exceptional customer service. Whether you're just beginning your fitness journey or are an experienced athlete, our team is here to guide you in selecting the right products for your needs. Your success is our top priority.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
