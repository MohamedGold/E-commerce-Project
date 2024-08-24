import React, { useContext, useEffect, useState } from 'react';
import styles from './AllOrders.module.css';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function AllOrders() {
  const {
    cartId,
    userId,
    checkOutCash,
    getOrders,
    orders,
    loading,
    setLoading,
    setOrders,
  } = useContext(CartContext);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUserOrder() {
    setLoading(true);
    await getOrders();
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedNewUserId = localStorage.getItem('NewUserId');

    if (
      storedUserId &&
      storedUserId !== 'undefined' &&
      storedUserId !== 'null'
    ) {
      getUserOrder();
    } else if (storedNewUserId) {
      getUserOrder();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, []);

  // if (loading) {
  //   return (
  //     <div className="container mx-auto max-w-screen-xl">
  //       <p className="text-center text-3xl font-bold text-[var(--main-color)]">
  //         Loading your orders...
  //       </p>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="container mx-auto max-w-screen-xl">
        <p className="text-center text-xl text-red-500">{error}</p>
      </div>
    );
  }

  function formatPrice(price) {
    return `${price.toFixed(2)} EGP`;
  }

  function formatDate(dateString) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="container mx-auto max-w-screen-xl">
        {loading && <Loader />}
        <p className="text-center text-3xl my-5 pt-5 font-bold text-[var(--main-color)]">
          Your Orders
        </p>
        <div className="order-box">
          {orders.length === 0 ? (
            <p className="text-center text-xl">
              You haven't placed any orders yet.
            </p>
          ) : (
            <div className="flex flex-wrap">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="order-item  p-4  border-[10px] shadow-md mb-10 rounded-md m-2 w-full"
                >
                  <div className=" order-details shadow-md p-3 bg-slate-200 rounded-xl">
                    <h3 className="text-xl  w-full  font-semibold mb-2">
                      Order ID: {order.id}
                    </h3>
                    <p className="text-lg bg-blue-200 rounded mb-2">
                      Deliver to: {order.user.name}
                    </p>
                    <p className="text-lg mb-2">
                      Phone: {order.shippingAddress.phone}
                    </p>
                    <p className="text-lg bg-white rounded mb-2">
                      Delivery address: {order.shippingAddress.details},{' '}
                      {order.shippingAddress.city}
                    </p>
                    <p className="text-lg mb-2">
                      Paid: {order.isPaid ? 'Yes' : 'No'}
                    </p>
                    <p className="text-lg bg-white rounded mb-2">
                      Payment method: {order.paymentMethodType}
                    </p>
                    <p className="text-lg mb-2">
                      Shipping price: {formatPrice(order.shippingPrice)}
                    </p>
                    <p className="text-lg bg-white rounded mb-2">
                      Taxes: {formatPrice(order.taxPrice)}
                    </p>
                    <p className="text-lg mb-2 bg-green-300 rounded  font-bold">
                      Total price: {formatPrice(order.totalOrderPrice)}
                    </p>
                    <p className="text-lg bg-white rounded mb-5  ">
                      Made at: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="oder-card  flex flex-wrap justify-center lg:justify-normal items-center gap-5 space-x-2 mt-4">
                    {order.cartItems.map((item) => (
                      <Link
                        to={`/productdetails/${item.product.id}/${item.product.category.name}`}
                        key={item._id}
                        className="mb-5 border p-5 cursor-pointer transition-all hover:transition hover:duration-500  hover:bg-slate-200 rounded-lg shadow-lg "
                      >
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-36 h-36 mx-auto object-contain mb-2"
                        />
                        <p className="text-lg">
                          Product:{' '}
                          {item.product.title.split(' ').splice(0, 2).join(' ')}
                        </p>
                        <p className="text-lg">
                          Price: {formatPrice(item.price)}
                        </p>
                        <p className="text-lg">Quantity: {item.count}</p>
                        <p className="text-lg font-bold">
                          Subtotal: {formatPrice(item.price * item.count)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}
