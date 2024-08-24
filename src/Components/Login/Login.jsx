import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/CartContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Login() {
  let { token, setToken, setUserName, userName } = useContext(TokenContext);

  let { userId ,setUserId } = useContext(CartContext);
  const [userMessage, setuserMessage] = useState(null);
  const [userError, setuserError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Invalid Email '),
    password: Yup.string()
      .required('Password is Required')
      .matches(/^[A-z][a-z0-9]{3,8}$/, 'Password Not Valid'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: mySchema,
    // validate,  => custom validate
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setisLoading(true);
    return await axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((data) => {
        console.log('data', data.data);
        console.log('username', data.data.user.name);
        setuserMessage(data.data.message);
        setisLoading(false);
        // * Save Token To LocalStorage
        localStorage.setItem('userToken', data.data.token);
        // * Save User Name To LocalStorage
        localStorage.setItem('userName', data.data.user.name);
        // * Save Token To All Components
        setToken(data.data.token);
        // * Save User Name To All Components
        setUserName(data.data.user.name);
        // * Save User Id To LocalStorage
        // localStorage.setItem('userId',userId);

        


        //* Go to => Login
        navigate('/');
      })
      .catch((error) => {
        console.log('error', error.response.data.message);
        setisLoading(false);
        setuserError(error.response.data.message);
      });
  }

  return (
    <>
      <>
        <HelmetProvider>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className="container mx-auto px-5 md:px-0  py-20  max-w-screen-md">
            <h1 className="text-2xl font-bold text-center mb-4 ">Login Now:</h1>
            {userError ? (
              <div
                className=" my-2 text-center font-bold p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-600"
                role="alert"
              >
                {userError}
              </div>
            ) : null}

            {userMessage ? (
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                {userMessage}
              </div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  email
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div
                    className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="my-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div
                    className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="text-center">
                {isLoading ? (
                  <button
                    type="submit"
                    className="bg-main text-white px-4 py-3 rounded-lg"
                  >
                    <i className="fa fa-spinner fa-spin "></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className=" bg-main border font-semibold  text-white transition-all   my-3 px-4 py-3 rounded-lg"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Login Now
                  </button>
                )}

                <Link to="/forget-password">
                  <div className="text-center text-sm w-fit mx-auto mt-2 hover:text-green-700">
                    forget Password ?
                  </div>
                </Link>
              </div>
              <Link to="/register">
                <div className="text-center text-sm hover:text-green-700 w-fit mx-auto mt-4">
                  Don't have an account? Sign Up
                </div>
              </Link>
            </form>
          </div>
        </HelmetProvider>
      </>
    </>
  );
}
