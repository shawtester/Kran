import React, { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { BsFillCloudSunFill } from 'react-icons/bs';
import myContext from '../../context/data/myContext';
import R1 from '../../assets/Images/R1.jpg';










export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const context = useContext(myContext);
  const { toggleMode, mode } = context;
  const user = JSON.parse(localStorage.getItem('user'));

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/";
  };

  const handleNavigateAndClose = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="w-full relative">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="ml-auto bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"> Close menu</span>
                    ✖
                  </button>
                </div>
                <div className="mt-6 px-4">
                  <nav className="space-y-6">
                    <button
                      onClick={() => handleNavigateAndClose('/')}
                      className="text-gray-700 block text-left w-full hover:text-red-500 font-bold transition duration-300"
                    >
                      Home
                    </button>

                    <Link
                      to="/order"
                      className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                    >
                      Order
                    </Link>
                    <Link
                      to="/about"
                      className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                    >
                      About
                    </Link>
                   <Link to="/certificate"  className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"  state={{ fromLink: true }}>View Certificate's</Link>
                    <Link
                      to="/contact"
                      className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                    >
                      Help & Support 
                    </Link>


                    {user?.user?.email === 'aman05cmj@gmail.com' && (
                      <Link
                        to="/dashboard"
                        className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                      >
                        Admin
                      </Link>
                    )}

                    <button
                      className="flex justify-between items-center w-full text-gray-700 hover:text-red-500 font-bold transition duration-300"
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                    >
                      Shop By Category
                      <span className="ml-2">
                        {categoriesOpen ? '▼' : '▶'}
                      </span>
                    </button>

                    {categoriesOpen && (
                      <div className="pl-4 space-y-2">
                        <Link
                          to="/category/Whey"
                          className="text-gray-600 block hover:text-red-500 transition duration-300 font-bold"
                        >
                          Whey Protein
                        </Link>
                        <Link
                          to="/category/Isolated"
                          className="text-gray-600 block hover:text-red-500 transition duration-300 font-bold"
                        >
                          Whey Isolated
                        </Link>
                        <Link
                          to="/category/Gainers"
                          className="text-gray-600 block hover:text-red-500 transition duration-300 font-bold"
                        >
                          Gainers
                        </Link>
                        <Link
                          to="/category/Creatine"
                          className="text-gray-600 block hover:text-red-500 transition duration-300 font-bold"
                        >
                          Creatine
                        </Link>
                        <Link
                          to="/category/Omega3"
                          className="text-gray-600 block hover:text-red-500 transition duration-300 font-bold"
                        >
                          Omega3
                        </Link>
                      </div>
                    )}

                    {user ? (
                      <a
                        onClick={logout}
                        className="text-gray-700 block hover:text-red-500 transition duration-300 font-bold cursor-pointer"
                      >
                        Logout
                      </a>
                    ) : (
                      <Link
                        to="/signup"
                        className="text-gray-700 block hover:text-red-500 transition duration-300 font-bold"
                      >
                        Signup
                      </Link>
                    )}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white shadow">
        <p
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: mode === 'dark' ? '#FF6347' : '#F87171',
            color: mode === 'dark' ? 'white' : '',
          }}
        >
          Get free delivery on orders over ₹300
        </p>

        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === 'dark' ? '#282c34' : '',
            color: mode === 'dark' ? 'white' : '',
          }}
        >
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="bg-gray-100 p-2 rounded-md text-gray-700"
                onClick={() => setOpen(true)}
              >
                ☰
              </button>
            </div>

            <div className="flex flex-grow items-center justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="w-auto flex justify-center">
                  <img
                    src={R1}
                    alt="Logo"
                    className="h-auto max-h-8 sm:max-h-10 md:max-h-12 lg:max-h-14 xl:max-h-16 w-auto max-w-full mx-2 object-contain"
                  />
                </div>
                <Link to={'/'} className="flex items-center ml-4">
                  <h1
                    className="text-lg sm:text-xl md:text-2xl font-bold px-2 py-1 rounded whitespace-nowrap"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    <span className="text-black">SUPPLEMENT</span>
                    <span className="text-red-600">-ADDA</span>
                  </h1>
                </Link>
              </div>
            </div>

            <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
              <div className="hidden lg:flex items-center space-x-4">
              <Link
                      to="/about"
                      className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                    >
                      About
                    </Link>
                 
              


<Link to="/certificate" className="text-gray-700 block hover:text-red-500 font-bold transition duration-300" state={{ fromLink: true }}>
  View Certificates
</Link>

                <Link
                  to={'/order'}
                  className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Order
                </Link>
                
                 

                {user?.user?.email === 'aman05cmj@gmail.com' && (
                  <Link
                    to={'/dashboard'}
                    className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    Admin
                  </Link>
                )}

                {user ? (
                  <a
                    onClick={logout}
                    className="text-gray-700 block hover:text-red-500 font-bold transition duration-300"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    Logout
                  </a>
                ) : (
                  <Link
                    to={'/signup'}
                    className="text-sm font-medium pt-4 lg:pt-0 hover:text-red-500 transition duration-300 font-bold"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    Signup
                  </Link>
                )}
              </div>

              <button
                className="relative text-gray-700 hover:text-red-500 transition duration-300 font-bold"
                onClick={toggleMode}
              >
                <BsFillCloudSunFill size={24} />
              </button>

              <button
                className="relative text-gray-700 hover:text-red-500 transition duration-300 font-bold"
                onClick={() => navigate('/cart')}
              >
                <FaShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                  {totalItems}
                </span>
              </button>

              <Link
                to={'/search'}
                className="text-gray-700 hover:text-red-500 transition duration-300 font-bold"
              >
                <FaSearch size={24} />
              </Link>
              
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
