import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContext);
  let { addProductToWishlist, deleteWishlist, getWishlistProducts } =
    useContext(WishlistContext);

  let { id, category } = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [relatedWishlistStatus, setRelatedWishlistStatus] = useState({});

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
    checkIfInWishlist();
  }, [id]);

  async function getProductDetails() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  }

  async function getRelatedProducts() {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/products'
      );
      const related = response.data.data.filter(
        (product) => product.category.name === category
      );
      const initialWishlistStatus = {};
      related.forEach((product) => {
        initialWishlistStatus[product.id] = false;
      });
      setRelatedWishlistStatus(initialWishlistStatus);
      setRelatedProducts(related);
    } catch (err) {
      console.error(err);
    }
  }

  async function checkIfInWishlist() {
    const wishlist = await getWishlistProducts();
    const inWishlist = wishlist.data.data.some((item) => item.id === id);
    setIsInWishlist(inWishlist);
    const updatedRelatedWishlistStatus = {};
    wishlist.data.data.forEach((item) => {
      if (relatedWishlistStatus[item.id] !== undefined) {
        updatedRelatedWishlistStatus[item.id] = true;
      }
    });
    setRelatedWishlistStatus((prevState) => ({
      ...prevState,
      ...updatedRelatedWishlistStatus,
    }));
  }

  async function toggleWishlist() {
    if (isInWishlist) {
      await deleteWishlist(productDetails.id);
    } else {
      await addProductToWishlist(productDetails.id);
    }
    setIsInWishlist(!isInWishlist);
  }

  async function toggleRelatedWishlist(productId) {
    if (relatedWishlistStatus[productId]) {
      await deleteWishlist(productId);
    } else {
      await addProductToWishlist(productId);
    }
    setRelatedWishlistStatus((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <div className="max-w-screen-xl container mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
            <div className="w-full md:w-1/4 my-10">
              <Slider {...settings}>
                {productDetails?.images?.map((src, index) => (
                  <img
                    className="w-full my-4"
                    src={src}
                    key={index}
                    alt={`Product ${index + 1}`}
                  />
                ))}
              </Slider>
            </div>

            <div className="w-full md:w-3/4 mx-4">
              <h2 className="text-black font-bold my-3 text-2xl">
                {productDetails.title}
              </h2>
              <h3 className="text-gray-500">{productDetails.description}</h3>
              <p className="mt-5">{productDetails.category?.name}</p>

              <div className="flex justify-between items-center my-4">
                <p className="w-1/2">{productDetails.price} EGP</p>
                <div className="w-1/2">
                  <i className="fa fa-star text-[var(--rating-color)]"></i>
                  {productDetails.ratingsAverage}
                </div>
              </div>
              <div className="flex items-center my-2 justify-center">
                <i
                  onClick={toggleWishlist}
                  className={`fa-solid fa-heart fa-2x cursor-pointer transition p-2 ${
                    isInWishlist ? 'text-red-500' : 'text-black'
                  }`}
                ></i>
              </div>
              <div className="text-center">
                <button
                  onClick={() => addProductToCart(productDetails.id)}
                  className="bg-green-600 w-full text-white px-3 mb-5 md:mb-0 py-2 rounded-md my-3"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto  max-w-screen-xl">
        {isLoading ? (
          <div className="h-100 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <h1 className="text-center text-2xl font-bold my-2">
              Related Products
            </h1>
            <div className="flex flex-wrap justify-center mx-auto mb-10 gap-4 px-5 lg:px-0">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full md:w-1/3 lg:w-1/5 px-5 mx-5 mt-10 border border-slate-300"
                >
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                    onClick={scrollToTop}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h5 className="text-[var(--main-color)]">
                      {product.category.name}
                    </h5>
                    <p>{product.title.split(' ').splice(0, 2).join(' ')}</p>
                    <div className="flex justify-between items-center">
                      <p className="w-1/2">{product.price} EGP</p>
                      <div className="w-1/2 text-end">
                        <i className="fa fa-star text-[var(--rating-color)]"></i>
                        {product.ratingsAverage.toFixed(1)}
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center my-2 justify-center">
                    <i
                      onClick={() => toggleRelatedWishlist(product.id)}
                      className={`fa-solid fa-heart fa-2x cursor-pointer transition ${
                        relatedWishlistStatus[product.id]
                          ? 'text-red-500'
                          : 'text-black'
                      }`}
                    ></i>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="bg-green-600 text-white px-3 py-2 rounded-md my-3"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
