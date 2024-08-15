import React, { useContext, useEffect, useState } from 'react';
import styles from './Wishlist.module.css';
import { WishlistContext } from '../../Context/WishlistContext';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let { getWishlistProducts, deleteWishlist } = useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  async function addToCart(productId) {
    let response = await addProductToCart(productId);
    console.log(response);
  }

  async function getWishlist() {
    setLoading(true);
    let response = await getWishlistProducts();
    setWishlistItems(response.data.data);
    setLoading(false);
  }

  async function deleteWishItem(productId) {
    setLoading(true);
    let response = await deleteWishlist(productId);
    console.log(response, 'delete');
    await getWishlist();
    setLoading(false);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative container flex flex-col flex-wrap items-center justify-center xl:flex-none 2xl:container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-2xl md:text-4xl font-extrabold text-center my-10">
            My Wishlist
          </h1>

          <table className="w-full text-sm text-left rtl:text-right">
            {wishlistItems.map((item) => (
              <tbody
                key={item._id}
                className="flex flex-col flex-wrap justify-center gap-y-10 xl:gap-0 items-center xl:table-row-group lg:flex-none"
              >
                <tr className="border-b flex lg:table-row lg:flex-none lg:justify-normal flex-wrap items-center justify-center">
                  <td className="p-4">
                    <img
                      src={item.imageCover}
                      className="w-40 md:w-60 max-w-full max-h-full"
                      alt={item.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">{item.title}</td>
                  <td className="px-6 py-4 font-semibold">{item.price} EGP</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteWishItem(item.id)}
                      className="font-medium hover:bg-red-800 transition-all rounded bg-red-400 py-3 px-4 text-white"
                    >
                      Remove
                    </button>
                  </td>
                  <td className=" px-5 py-4">
                    <button
                      onClick={() => addToCart(item.id)}
                      className="font-medium hover:bg-red-800 transition-all rounded bg-[var(--main-color)] py-3 px-8 text-white"
                    >
                      Add To Cart
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </>
  );
}
