import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TokenContext } from './TokenContext';
import { Toast } from 'flowbite-react';

export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const { token } = useContext(TokenContext);

  let headers = {
    token: localStorage.getItem('userToken'),
  };

  async function addProductToCart(productId) {
    return await axios
      .post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data.data.totalCartPrice);
        setTotalPrice(response.data.data.totalCartPrice);
        setNumberOfCartItems(response.data.numOfCartItems);
        setCartId(response?.data.data._id, 'card id');

        toast.success('Success');

        return response;
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        return err;
      });
  }

  async function getCartProducts() {
    if (!token) return;
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers,
      })
      .then((response) => {
        console.log(response.data.data._id, 'cart data id');
        setNumberOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartId(response?.data.data._id, 'card id');

        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function deleteProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setNumberOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartId(response?.data.data._id, 'card id');

        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function updateCartItem(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartId(response?.data.data._id, 'card id');

        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function checkOutOnline(shippingAddress) {
    const url = `${window.location.origin}/#/allorders`;
    console.log('Redirecting to:', url);
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(
          url
        )}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data.session.url, 'online');
        console.log(response, 'testttt');
        // setNumberOfCartItems(response.data.numOfCartItems);
         console.log('Session URL from response:', response.data.session.url);
        window.location.href = response.data.session.url;
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }


  useEffect(() => {
    const handlePostPaymentRedirect = () => {
      if (window.location.hash.includes('/allorders')) {
        window.location.hash = '/allorders'; // Ensure proper URL after payment
      }
    };

    handlePostPaymentRedirect();
  }, []);

  async function checkOutCash(shippingAddress) {
    const url = `${window.location.origin}/#/allorders`;

    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response, 'cash');
        setTotalPrice(response.data.data.totalCartPrice);
        setNumberOfCartItems(response.data.numOfCartItems);

        toast.success('Order placed successfully');
        window.location.href = url;

        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setNumberOfCartItems(0);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  useEffect(() => {
    if (!token) {
      setNumberOfCartItems(0);
      setTotalPrice(0);
      setCartId(null);
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        deleteProduct,
        getCartProducts,
        updateCartItem,
        clearCart,
        setTotalPrice,
        numberOfCartItems,
        setNumberOfCartItems,
        totalPrice,
        checkOutOnline,
        checkOutCash,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
