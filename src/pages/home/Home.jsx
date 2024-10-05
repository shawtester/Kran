import React from 'react'
import Layout from '../../components/layout/Layout'
import Carousel from '../../components/carousel/Carousel';

import ProductCart from '../../components/productCart/ProductCart'
import Testimonial from '../../components/testimonial/Testimonial'
import Track from '../../components/track/Track';
import Footer from '../../components/footer/Footer';

import MiniCarousel from '../../components/minicarousel/MiniCarousel'
import ShopByCategory from '../../components/shopbycate/ShopByCategory'
import ShowImages from '../../components/showimages/ShowImages'
import Certificate from '../../components/certificate/Certificate';

const Home = () => {
  return (
    <Layout>
      <MiniCarousel/>
      
      <Carousel/>
      
      
      <ProductCart category="Whey" heading="Category Whey"/>
      <ProductCart category="Multi-Vitamins" heading="Category Whey"/>
      <ProductCart category="Whey-Isolate" heading="Category Whey"/>
      <ShopByCategory/>
      <ProductCart category="Gainers" heading="Category Gainers"/>
      
      <ProductCart category="Pre-Workout" heading="Category Pre-Workout"/>
      <ShowImages/>
      <Certificate/>
      <ProductCart category="Creatine" heading="Category Creatine"/>
      <ProductCart category="Omega3" heading="Category Omega3"/>
      <ProductCart category="BCAA-Aminos" heading="Category Aminos"/>
      <ProductCart category="Weight-Loss" heading="Category Weight-Loss"/>
      <ProductCart category="Glutamine" heading="Category Glutamine"/>
      <ProductCart category="Nitrix-Oxide" heading="Category Nitrix-Oxide"/>
      
    
      
      
        
  
      
     
    
      <Testimonial/>
   
      

      <Track/>
      <Footer/>
    </Layout>
  
  )
}

export default Home