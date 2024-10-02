import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage';
import Order from './pages/order/Order';
import Mystate from "./context/data/myState";
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import Productinfo from './pages/productinfo/Productinfo';
import Model from './components/model/Model'
import AddProduct from './pages/admin/page/Addproduct';
import UpdateProduct from './pages/admin/page/Updateproduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './ScrollToTop';
import ProductCart from './components/productCart/ProductCart';
import OrderTracking0102 from './pages/admin/dashboard/OrderTracking0102'
import ShowImges from './components/showimages/ShowImages'

import CategoryPage from './pages/category/CategoryPage';
import About from './components/footer/About';
import Contact from './components/footer/Contact';

import '@fortawesome/fontawesome-free/css/all.min.css';
import  Search from './pages/search/Search';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import VerticalCategoryPage from './pages/category/VerticalCategoryPage';
import Testimonial from './components/testimonial/Testimonial';
import Certificate from './components/certificate/Certificate';
import StickyPhone from './components/phonenumber/StickyPhone';








const App = () => {
  return (
    
    <Mystate>

  
    <Router>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={
            <ProtectedRoutes>
              <Order/>
            </ProtectedRoutes>
          } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>
          } />
        <Route path="/*" element={<Nopage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/testimonial" element={<Testimonial/>} />
        <Route path="/certificate" element={<Certificate/>}/>

        
        <Route path='/productinfo/:id' element={<Productinfo/>}/>
        <Route path='/model' element={<Model/>}/>
       
        <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>} />
     <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>} />



<Route path="/product/:id" element={<Productinfo />} />
<Route path='/showimges' element={<ShowImges/>}/>
<Route path="/category/:categoryName" element={<CategoryPage />} />

<Route path="/category/:categoryName/vertical" element={<VerticalCategoryPage />} />

<Route path="/category/:categoryName/products" element={<ProductCart />} />
<Route path='/search' element={<Search/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/ordertracking0102' element={<OrderTracking0102/>}/>


       
      </Routes>
      <StickyPhone/>
      <ToastContainer/>
   
    </Router>
    </Mystate>
    
  )
}

export default App



export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('user')) {//currentUser
    return children
  }
  else {
    return <Navigate to='/login'/>
  }
}






export const ProtectedRoutesForAdmin = ({ children }) => {
  // Fetch the user from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Ensure `storedUser` exists and has the necessary fields
  if (storedUser && storedUser.user && storedUser.user.email) {
    const userEmail = storedUser.user.email;

    // Check if the logged-in user's email matches the admin's email
    if (userEmail === 'aman05cmj@gmail.com') {
      return children; // Allow access to the admin-protected routes
    }
  }

  // Redirect to the login page if the user is not an admin
  return <Navigate to='/login' />;
};
