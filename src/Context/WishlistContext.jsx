import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TokenContext } from './TokenContext';

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [numberOfWishlist, setNumberOfWishlist] = useState(0);
  const { token } = useContext(TokenContext);
  // const [totalWishlist, setTotalWishlist] = useState(0);

  let headers = {
    token: localStorage.getItem('userToken'),
  };

  async function addProductToWishlist(productId) {
    return await axios
      .post(
        ' https://ecommerce.routemisr.com/api/v1/wishlist',
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setNumberOfWishlist(response.data.data.length);
        toast.success('Success');

        return response;
      })
      .catch((err) => {
        console.log(err);
        toast.error(response.data.message);
        return err;
      });
  }

  async function getWishlistProducts() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers,
      })
      .then((response) => {
        console.log(response.data.data);
        setNumberOfWishlist(response.data.count);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function deleteWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setNumberOfWishlist(response.data.data.length);

        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function isProductInWishlist(productId) {
    let wishlistResponse = await getWishlistProducts();
    return wishlistResponse.data.data.some((item) => item.id === productId);
  }

   useEffect(() => {
     if (!token) {
       setNumberOfWishlist(0);
     }
   }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistProducts,
        setNumberOfWishlist,
        numberOfWishlist,
        deleteWishlist,
        isProductInWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
