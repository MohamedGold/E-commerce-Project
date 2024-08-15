import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/CartContext';
import logo from '../../assets/freshcart-logo.svg';
import { WishlistContext } from '../../Context/WishlistContext';

export default function NavBar() {
  let navigate = useNavigate();
  let { token, setToken, userName, setUserName } = useContext(TokenContext);
  let { numberOfCartItems, getCartProducts, setNumberOfCartItems } =
    useContext(CartContext);
  let { getWishlistProducts, numberOfWishlist, setNumberOfWishlist } =
    useContext(WishlistContext);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function getWishlist() {
    getWishlistProducts();
  }

  function getCart() {
    getCartProducts();
  }

  useEffect(() => {
    getCart();
    getWishlist();
  }, []);

  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setToken(null);

    setNumberOfCartItems(0);
    setNumberOfWishlist(0);

    navigate('/login');
  }

  useEffect(() => {
    if (token) {
      getCart();
      getWishlist();
    } else {
      setNumberOfCartItems(0);
      setNumberOfWishlist(0);
    }
  }, [token]);

    function toggleMobileMenu() {
      setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
    }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <nav className="bg-main-light   fixed w-full z-20 top-0 start-0 ">
        <div className="  max-w-screen-xl      container mx-auto   flex flex-wrap items-center justify-between  p-4">
          <Link
            onClick={() => scrollToTop()}
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt="logo" className="test" />
          </Link>
          <div className="flex lg:order-2  space-x-3 lg:space-x-0  rtl:space-x-reverse">
            <ul className=" flex-col p-4 lg:p-0 mt-4 font-medium items-center  rounded-lg  lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0  cursor-pointer hidden   lg:flex     ">
              {token ? (
                <>
                  <li>
                    <Link
                      to="wishlist"
                      onClick={() => scrollToTop()}
                      className=" relative block py-2 px-3 -me-8  hover:text-red-500 transition-all    my-3 lg:my-0  rounded   lg:p-0   "
                    >
                      <span className="mx-2 inline-block   ">Wishlist</span>
                      <i className=" fa-solid fa-heart fa-xl align-baseline me-5   transition-all"></i>
                      <span className="absolute top-[-15px] right-[5px] left-[60px] flex items-center w-fit justify-center bg-red-400  text-white text-xs  me-2 px-2 mx-2 py-0.5 rounded-full   font-bold ">
                        {numberOfWishlist}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="cart"
                      onClick={() => scrollToTop()}
                      className="relative block py-2 px-3   rounded    lg:p-0   "
                    >
                      <i className="fa-solid fa-cart-shopping text-slate-600 hover:text-[var(--main-color)] transition text-[25px]  "></i>
                      <span className="absolute top-[-12px] right-[5px] left-[0px] flex items-center w-fit justify-center   text-white  text-xs  me-2 px-2 mx-2 py-0.5 rounded-full   font-bold bg-main">
                        {numberOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-900 font-medium">
                      Hello,{' '}
                      {userName.length > 5
                        ? userName.slice(0, 5) + '..'
                        : userName}
                    </span>
                  </li>
                  <li>
                    <a
                      onClick={() => logOut()}
                      to="logout"
                      className="block py-2 px-3  rounded   lg:p-0   "
                    >
                      <i className="fa-solid fa-right-from-bracket me-2"></i>
                      LogOut
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="login"
                      className="block py-2 px-3  rounded   lg:p-0 "
                    >
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="register"
                      className="block py-2 px-3  rounded   lg:p-0 "
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-center w-full lg:flex lg:w-auto lg:order-1 ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`} // Conditionally render the mobile menu
            id="navbar-sticky"
          >
            {token ? (
              <ul className="flex flex-col items-center justify-center mx-auto lg:border-none border-b-[3px] border-b-gray-700   p-4 lg:p-0 mt-4 font-medium     lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 ">
                <li>
                  <NavLink
                    to=""
                    onClick={() => scrollToTop()}
                    className="block py-2 px-3    rounded lg:bg-transparent  lg:p-0 "
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cart"
                    onClick={() => scrollToTop()}
                    className="relative block py-2 px-3 text-gray-900 rounded    lg:p-0  "
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="product"
                    onClick={() => scrollToTop()}
                    className="relative block py-2 px-3 text-gray-900 rounded    lg:p-0 "
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="category"
                    onClick={() => scrollToTop()}
                    className="relative block py-2 px-3 text-gray-900 rounded    lg:p-0 "
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brand"
                    onClick={() => scrollToTop()}
                    className="relative block py-2 px-3 text-gray-900 rounded    lg:p-0 "
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}

            {/* =============================================== */}

            <div className="flex justify-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
              <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium   rounded-lg  lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 cursor-pointer lg:hidden    ">
                {token ? (
                  <>
                    <li>
                      <Link
                        to="wishlist"
                        onClick={() => scrollToTop()}
                        className="relative block py-2 px-3 text-center my-3  rounded   lg:p-0   "
                      >
                        <i className="fa-solid fa-heart fa-xl hover:text-red-500 transition"></i>
                        <span className="absolute top-[-10px] right-[5px] left-[40px] flex items-center w-fit justify-center bg-red-400  text-white text-xs  me-2 px-2 mx-2 py-0.5 rounded-full   font-bold ">
                          {numberOfWishlist}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="cart"
                        onClick={() => scrollToTop()}
                        className="relative block py-2 px-3  text-center  rounded    lg:p-0   "
                      >
                        <i className="fa-solid fa-cart-shopping text-slate-600 hover:text-[var(--main-color)] transition text-[25px]  "></i>
                        <span className="absolute top-[-12px] right-[5px] left-[15px] flex items-center w-fit justify-center  text-white font-bold text-xs  me-2 px-3 mx-2 py-0.5 rounded-full   bg-main">
                          {numberOfCartItems}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={() => logOut()}
                        to="logout"
                        className="block py-2 px-3  rounded   lg:p-0   "
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                        LogOut
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="login"
                        className="block py-2 px-3  rounded   lg:p-0 "
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="register"
                        className="block py-2 px-3  rounded   lg:p-0 "
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
