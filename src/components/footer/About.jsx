import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 to-white text-gray-900 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-8 text-center">About Us</h1>

          {/* Company Introduction */}
          <p className="text-lg mb-8 text-center leading-relaxed max-w-3xl mx-auto">
            Welcome to Supplement Adda, your trusted source for premium sports nutrition and wellness products. Our mission is to empower individuals with the highest quality supplements to achieve their health and fitness goals. Whether you're looking for whey protein, whey isolates, gainers, or specialized products, we have you covered.
          </p>

          {/* Our Mission */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              At Supplement Adda, we believe in the power of nutrition to transform lives. Our mission is to provide cutting-edge, science-backed supplements that help athletes, fitness enthusiasts, and everyday people unlock their potential. From increasing muscle mass to aiding recovery, we ensure that every product we offer is made from the finest ingredients and meets the highest standards of quality.
            </p>
          </div>

          {/* Our Products */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Our Products</h2>
            <p className="text-lg text-gray-700 mb-4">
              We specialize in a wide range of products designed to support your fitness journey:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
              <li><strong>Whey Protein:</strong> Ideal for post-workout recovery, promoting muscle repair and growth.</li>
              <li><strong>Whey Isolates:</strong> A purer form of whey protein, with higher protein content and minimal fats or carbs, perfect for lean muscle building.</li>
              <li><strong>Mass Gainers:</strong> Designed to help individuals increase muscle mass and weight, combining high-quality protein with complex carbohydrates.</li>
              <li><strong>Pre-Workouts:</strong> Give yourself a performance boost before hitting the gym with our range of pre-workout supplements.</li>
              <li><strong>Post-Workout Supplements:</strong> Aid your body's recovery process with supplements rich in essential nutrients.</li>
            </ul>
          </div>

          {/* Our Story */}
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Supplement Adda began with a simple mission – to make high-quality sports nutrition products accessible to everyone. Our founders, fitness enthusiasts themselves, struggled to find reliable supplements that met their needs, and so they decided to create their own platform. From humble beginnings to a thriving business, we've stayed committed to offering only the best supplements to help others achieve their health and fitness goals.
            </p>
          </div>

          {/* Customer Testimonials */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">What Our Customers Say</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-md">
                <p className="text-lg text-gray-700 italic">"I've been using Supplement Adda products for over a year now, and I've seen amazing results in my fitness journey!"</p>
                <p className="text-right text-blue-700 font-bold">- Rajesh Singh</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-md">
                <p className="text-lg text-gray-700 italic">"Their whey protein is the best on the market, and I love their quick shipping!"</p>
                <p className="text-right text-blue-700 font-bold">- Karan Rudola</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Supplement Adda, we are dedicated to offering more than just products. Here’s why our customers choose us:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
              <li><strong>Uncompromising Quality:</strong> Every product is tested and verified for purity and potency.</li>
              <li><strong>Expert Support:</strong> Our team of nutrition experts is here to guide you.</li>
              <li><strong>Fast Delivery:</strong> Enjoy quick and reliable shipping to get your supplements when you need them.</li>
              <li><strong>Customer-Centered:</strong> We put our customers first in everything we do.</li>
            </ul>
          </div>

          {/* Our Partners */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              We are proud to collaborate with some of the most trusted names in the fitness and supplement industry. Our partners share our commitment to quality, innovation, and customer satisfaction. Together, we ensure that you get access to the best products available in the market.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our partners include leading manufacturers of whey protein, gainers, and other essential fitness supplements. By working closely with them, we ensure that every product on our platform meets the rigorous standards of athletes and fitness professionals.
            </p>
          </div>

          {/* Commitment to Quality */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Our Commitment to Quality</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              We take great pride in the quality of our products. Every item we sell undergoes strict quality control measures to ensure safety and effectiveness. Whether you're purchasing whey protein for muscle recovery or gainers for bulking, you can trust that our supplements are free from harmful additives and fillers, delivering only the best results.
            </p>
          </div>

          {/* Our Customers */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Our Customers</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are committed to delivering exceptional customer service. Whether you are just beginning your fitness journey or are an experienced athlete, our team is here to guide you in selecting the right products for your needs. Your success is our top priority, and we aim to build long-lasting relationships with our customers based on trust, transparency, and value.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
