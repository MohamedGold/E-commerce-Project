import React, { useState } from 'react';
import Layout from './Components/Layout/Layout';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import CategoriesProducts from './Components/CategoriesProducts/CategoriesProducts';
import BrandSpec from './Components/BrandSpec/BrandSpec';
import Wishlist from './Components/Wishlist/Wishlist';
import AllOrders from './Components/AllOrders/AllOrders';
import CheckOut from './Components/CheckOut/CheckOut';
import ForgetPass from './Components/ForgetPass/ForgetPass';

function App() {
  const queryClient = new QueryClient();
  let routes = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: '',
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'login',
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: 'register',
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: 'cart',
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'product',
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'productdetails/:id/:category',
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'category/:categoryId',
          element: (
            <ProtectedRoutes>
              <CategoriesProducts />
            </ProtectedRoutes>
          ),
        },

        {
          path: 'category',
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'brand',
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'brand/:id',
          element: (
            <ProtectedRoutes>
              <BrandSpec />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'wishlist',
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'allorders',
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'checkout',
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'forget-password',
          element: <ForgetPass />,
        },

        { path: '*', element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
