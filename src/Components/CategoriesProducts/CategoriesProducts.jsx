import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function CategoriesProducts() {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistStatus, setWishlistStatus] = useState({});

  const { addProductToWishlist, deleteWishlist, getWishlistProducts } =
    useContext(WishlistContext);

  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
        );
        const productsData = response.data.data;

        const wishlist = await getWishlistProducts();
        const wishlistStatus = {};
        productsData.forEach((product) => {
          wishlistStatus[product.id] = wishlist.data.data.some(
            (item) => item.id === product.id
          );
        });

        setProducts(productsData);
        setWishlistStatus(wishlistStatus);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

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

  return (
    <HelmetProvider>
      <div className="container max-w-screen-xl  mx-auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error.message}</p>
        ) : products.length == 0 ? (
          <p className="text-center capitalize font-extrabold text-4xl pt-10">
            there is no products
          </p>
        ) : (
          <div className="flex flex-wrap md:w-full gap-3 px-5 md:px-3 mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/3 lg:w-1/5 px-5 group overflow-hidden rounded-xl p-4 border hover:shadow-3xl mx-auto hover:shadow-[var(--main-color)] my-3 transition-all duration-300 card-box relative"
              >
                <Helmet>
                  <title> Products</title>
                </Helmet>
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <div className="relative rounded-xl   ">
                    <img
                      src={product.imageCover}
                      className="w-full rounded-xl"
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
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col gap-8 rounded-lg items-center absolute top-10 bg-green-200 py-10 px-2     group-hover:start-[0px]  transition-all duration-300 -start-[500px] justify-center">
                  <i
                    onClick={() => toggleWishlist(product.id)}
                    className={`fa-solid fa-heart hover:text-red-300  fa-2x transition cursor-pointer mt-3 ${
                      wishlistStatus[product.id] ? 'text-red-500' : 'text-black'
                    }`}
                  ></i>

                  <div className="card-details">
                    <div className="text-center">
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="bg-green-500 hover:bg-[var(--main-color)] text-white  p-2 rounded-md my-3"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/*  */}
              </div>
            ))}
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}
