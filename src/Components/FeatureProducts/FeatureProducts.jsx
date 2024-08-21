import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function FeatureProducts() {
  let { addProductToCart } = useContext(CartContext);
  let { addProductToWishlist, deleteWishlist, getWishlistProducts } =
    useContext(WishlistContext);

  const [wishlistStatus, setWishlistStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      const response = await getWishlistProducts();
      if (response?.data?.data) {
        const wishlist = response.data.data;
        const status = wishlist.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {});
        setWishlistStatus(status);
      }
    };

    fetchWishlistStatus();
  }, [getWishlistProducts]); // Ensure this runs on component mount

  async function toggleWishlist(productId) {
    if (wishlistStatus[productId]) {
      await deleteWishlist(productId);
    } else {
      await addProductToWishlist(productId);
    }
    setWishlistStatus((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  }

  function getFeatureProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ['featureProducts'],
    queryFn: getFeatureProducts,
    staleTime: 5000,
    retry: 2,
    refetchInterval: 10000,
    onSuccess: (response) => {
      setFilteredProducts(response.data.data); // Set filtered products to the full list initially
    },
  });

  // Update filtered products based on search query
  useEffect(() => {
    if (data?.data?.data) {
      const filtered = data.data.data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, data]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <form className="max-w-md pt-10 container px-10 lg:px-0 mb-5 mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search By Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
              required
            />
          </div>
        </form>

        <div className="container max-w-screen-xl px-5 md:px-0 mx-auto">
          {isError ? <p>{error.message}</p> : null}
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap md:w-full gap-3 px-7 md:px-0 mx-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full md:w-1/3 lg:w-1/5 border p-4 rounded-xl group overflow-hidden hover:shadow-3xl hover:shadow-[var(--main-color)] my-3 transition-all duration-300 card-box relative mx-auto"
                >
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <div className="relative rounded-xl">
                      <img
                        src={product.imageCover}
                        className="w-full pb-3 border-b-[3px] border-b-slate-100 border-solid"
                        alt={product.title}
                      />
                      <h5 className="text-[var(--main-color)] my-3">
                        {product.category.name}
                      </h5>
                      <p className="font-semibold">
                        {product.title.split(' ').splice(0, 2).join(' ')}
                      </p>
                      <div className="flex justify-between my-2 items-center">
                        <p className="w-1/2">{product.price} EGP</p>
                        <div className="w-1/2 text-end me-5">
                          <i className="fa fa-star text-[var(--rating-color)]"></i>
                          {product.ratingsAverage.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-8 rounded-lg items-center absolute top-10 bg-green-200 py-10 px-2 group-hover:start-[0px] transition-all duration-300 -start-[500px] justify-center">
                    <div className="wishlist">
                      <i
                        onClick={() => toggleWishlist(product.id)}
                        className={`fa-solid fa-heart fa-2x transition hover:text-red-300 cursor-pointer ${
                          wishlistStatus[product.id]
                            ? 'text-red-400'
                            : 'text-slate-700'
                        } mt-3`}
                      ></i>
                    </div>

                    <div className="Cart">
                      <div
                        onClick={() => addProductToCart(product.id)}
                        className="text-center cursor-pointer bg-green-500 hover:bg-[var(--main-color)] text-white p-2 rounded-md my-3"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </HelmetProvider>
    </>
  );
}
