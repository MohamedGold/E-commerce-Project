import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function FeatureProducts() {
  let { addProductToCart } = useContext(CartContext);
  let {
    addProductToWishlist,
    deleteWishlist,
    isProductInWishlist,
    getWishlistProducts,
  } = useContext(WishlistContext);

  const [wishlistStatus, setWishlistStatus] = useState({});

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      const response = await getWishlistProducts();
      const wishlist = response.data.data;
      const status = wishlist.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setWishlistStatus(status);
    };

    fetchWishlistStatus();
  }, []);

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
  });

  return (
    <>
      <div className="container max-w-screen-xl px-5 md:px-0   mx-auto">
        {isError ? <p>{error.message}</p> : null}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap md:w-full    gap-3 px-7 md:px-0 mx-auto">
            {data?.data?.data.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/3 lg:w-1/5 border  rounded-xl    hover:shadow-3xl hover:shadow-[var(--main-color)] my-3 transition-all duration-300 card-box relative mx-auto"
              >
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <div className="p-5 rounded-xl ">
                    <img
                      src={product.imageCover}
                      className="w-full pb-3  border-b-[3px] border-b-slate-100 border-solid   "
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

                <div className="flex items-end justify-center">
                  <i
                    onClick={() => toggleWishlist(product.id)}
                    className={`fa-solid fa-heart fa-2x transition cursor-pointer ${
                      wishlistStatus[product.id] ? 'text-red-400' : 'text-black'
                    } mt-3`}
                  ></i>
                </div>

                <div className="card-details">
                  <div className="text-center">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="bg-green-500 hover:bg-[var(--main-color)] text-white px-5 py-2 rounded-md my-3"
                    >
                      + Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
