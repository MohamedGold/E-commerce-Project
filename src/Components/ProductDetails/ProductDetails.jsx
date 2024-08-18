import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, deleteWishlist, getWishlistProducts } =
    useContext(WishlistContext);

  const { id, category } = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [relatedWishlistStatus, setRelatedWishlistStatus] = useState({});

  const settings = {
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
    loadData();
  }, [id]);

  async function loadData() {
    try {
      await Promise.all([fetchProductDetails(), fetchRelatedProducts()]);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setIsLoading(false);
    }
  }

  async function fetchProductDetails() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(response.data.data);
      await checkIfInWishlist();
    } catch (err) {
      console.error('Error fetching product details:', err);
    }
  }

  async function fetchRelatedProducts() {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/products'
      );
      const related = response.data.data.filter(
        (product) => product.category.name === category
      );

      const wishlistResponse = await getWishlistProducts();
      const wishlistIds =
        wishlistResponse?.data?.data?.map((item) => item.id) || [];

      const initialWishlistStatus = {};
      related.forEach((product) => {
        initialWishlistStatus[product.id] = wishlistIds.includes(product.id);
      });

      setRelatedWishlistStatus(initialWishlistStatus);
      setRelatedProducts(related);
    } catch (err) {
      console.error('Error fetching related products:', err);
    }
  }

  async function checkIfInWishlist() {
    try {
      const wishlistResponse = await getWishlistProducts();
      if (wishlistResponse?.data?.data) {
        const inWishlist = wishlistResponse.data.data.some(
          (item) => item.id === id
        );
        setIsInWishlist(inWishlist);
      } else {
        setIsInWishlist(false);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  }

  async function toggleWishlist() {
    try {
      if (isInWishlist) {
        await deleteWishlist(productDetails.id);
      } else {
        await addProductToWishlist(productDetails.id);
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist status:', error);
    }
  }

  async function toggleRelatedWishlist(productId) {
    try {
      if (relatedWishlistStatus[productId]) {
        await deleteWishlist(productId);
      } else {
        await addProductToWishlist(productId);
      }

      const updatedRelatedWishlistStatus = {
        ...relatedWishlistStatus,
        [productId]: !relatedWishlistStatus[productId],
      };
      setRelatedWishlistStatus(updatedRelatedWishlistStatus);
    } catch (error) {
      console.error('Error toggling related wishlist status:', error);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="max-w-screen-xl  container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
            <div className="w-full md:w-1/4 my-10">
              <Slider {...settings}>
                {productDetails?.images?.map((src, index) => (
                  <img
                    className="w-full px-5 md:px-0 my-4"
                    src={src}
                    key={index}
                    alt={`Product ${index + 1}`}
                  />
                ))}
              </Slider>
            </div>

            <div className="w-full px-5 md:px-0 md:w-3/4 mx-4">
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
                  className={`fa-solid fa-heart fa-2x hover:text-red-300 cursor-pointer transition p-2 ${
                    isInWishlist ? 'text-red-500' : 'text-black'
                  }`}
                ></i>
              </div>

              <div className="text-center">
                <button
                  onClick={() => addProductToCart(productDetails.id)}
                  className="bg-green-600 hover:bg-[var(--main-color)] transition-all w-full text-white px-3 py-2 rounded-md my-3"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-screen-xl">
            <h1 className="text-center text-2xl border-t md:border-none md:pt-0 pt-5 md:mt-0 mt-12 font-bold my-2">
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
                    <p>{product.title.split(' ').slice(0, 2).join(' ')}</p>
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
                      className={`fa-solid fa-heart fa-2x hover:text-red-300 cursor-pointer transition ${
                        relatedWishlistStatus[product.id]
                          ? 'text-red-500'
                          : 'text-black'
                      }`}
                    ></i>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="bg-green-600 hover:bg-[var(--main-color)] transition-all text-white px-3 py-2 rounded-md my-3"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
