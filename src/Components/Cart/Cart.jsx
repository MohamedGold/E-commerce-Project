import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  let {
    getCartProducts,
    totalPrice,
    deleteProduct,
    updateCartItem,
    setTotalPrice,
    numberOfCartItems,
    setNumberOfCartItems,
    clearCart,
  } = useContext(CartContext);

  async function getCart() {
    let response = await getCartProducts();
    console.log(response.data.data.products, 'cart data');
    setCartItems(response.data.data.products);
    setLoading(false);
  }

  async function updateProduct(productId, count) {
    let response = await updateCartItem(productId, count);
    setCartItems(response.data.data.products);
    console.log(response);
  }

  async function deleteItem(productId) {
    let response = await deleteProduct(productId);
    console.log(response);
    setCartItems(response.data.data.products);
    setLoading(false);
  }

  async function clearCartItems() {
    let response = await clearCart();
    setCartItems([]);
    setTotalPrice(0);
    setNumberOfCartItems(0);
    console.log(response);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative container flex flex-col  flex-wrap items-center justify-center   xl:flex-none   2xl:container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          {/*  */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-center my-10">
            My Cart
          </h1>
          <div className="   my-5 flex w-full px-3 lg:px-0 justify-center items-center  text-lg  font-bold ">
            <div className="w-1/2 flex flex-wrap items-center justify-center">
              <p className=" ">Total Price</p>
              <p
                className="mx-4 text-[var(--main-color)] font-bold"
                colSpan="5"
              >
                {totalPrice}
              </p>
            </div>
            <div className="flex w-1/2   justify-center items-center ">
              <Link to="/checkout">
                <button className="bg-[var(--main-color)] hover:bg-green-700 transition text-white px-3 py-2 rounded-lg ">
                  Check Out
                </button>
              </Link>
            </div>
          </div>

          <table className="w-full   text-sm text-left rtl:text-right ">
            <thead className="text-xs border-y  hidden xl:table-header-group  uppercase ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col flex-wrap justify-center gap-y-10 xl:gap-0 items-center xl:table-row-group   lg:flex-none">
              {cartItems.map((item) => (
                <tr
                  key={item.product.id}
                  className=" border-b flex lg:table-row lg:flex-none lg:justify-normal   flex-wrap items-center  justify-center    "
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold  ">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateProduct(
                            item.product.id,
                            item.count - 1 <= 0
                              ? deleteItem(item.product.id)
                              : item.count - 1
                          )
                        }
                        className="inline-flex flex-wrap items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6  hover:bg-gray-100  border border-gray-300 rounded-full focus:outline-none  focus:ring-4 focus:ring-gray-200  "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{item.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          updateProduct(item.product.id, item.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium  bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200    "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold  ">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4 font-semibold  text-[var(--main-color)] ">
                    {item.price * item.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteItem(item.product.id)}
                      className="font-medium hover:bg-red-800 transition-all rounded bg-red-400 py-3 px-4 text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center my-5">
            <button
              onClick={() => clearCartItems()}
              className="bg-red-500 text-white px-5 py-3 rounded"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
