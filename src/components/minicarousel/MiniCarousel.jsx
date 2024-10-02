import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarouselA.css'; // Import your custom styles here

// Import local images
import Category1 from '../../assets/Images/Category1.png';  // Update the image paths accordingly
import Category2 from '../../assets/Images/Category2.png';
import Category3 from '../../assets/Images/Category3.png'; 
import Category4 from '../../assets/Images/Category4.png'; 
import Category5 from '../../assets/Images/Category5.png'; 
import Category6 from '../../assets/Images/Category6.png'; 
import Category7 from '../../assets/Images/Category7.png'; 


const MiniCarousel = () => {
  const navigate = useNavigate();

  // Redirect to home page if screen width is larger than 768px (tablet/desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navigate('/'); // Redirect to the homepage
      }
    };

    // Check screen size on component mount
    handleResize();

    // Add resize event listener to handle window size change
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const categories = [
    { id: 1, name: 'Whey', imageUrl:Category1},
    { id: 2, name: 'Isolated', imageUrl:Category2},
    { id: 3, name: 'Gainers', imageUrl:Category5},
    { id: 4, name: 'Creatine', imageUrl:Category4},
    { id: 5, name: 'Pre-Workout',imageUrl:Category3},
    { id: 6, name: 'Omega3',imageUrl:Category6},
    { id: 7, name: 'BCAA',imageUrl:Category7},
  ];

  const handleCardClick = (categoryName) => {
    navigate(`/category/${categoryName}/vertical`);
    console.log("Category Name:", categoryName);

  };

  return (
    <div className="carousel-containerr">
      <div className="carousel-wrapper">
 
        {categories.map((category) => (
          <div
            key={category.id}
            className="carousel-item"
            onClick={() => handleCardClick(category.name)}
          >
            <img src={category.imageUrl} alt={category.name} className="carousel-image" />
            <div className="carousel-caption">
         
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCarousel;
