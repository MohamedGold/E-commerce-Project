import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [userError, setuserError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let navigate = useNavigate();
  //! =>  custom validate
  // function validate(values) {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = 'Name is Required';
  //   } else if (values.name.length < 3) {
  //     errors.name = 'Name should be at least 3 characters long';
  //   }

  //   if (!values.email) {
  //     errors.email = 'Email is Required';
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = 'Password is Required';
  //   } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //     errors.password = 'Invalid Password';
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = 'rePassword is Required';
  //   } else if (values.password !== values.rePassword) {
  //     errors.rePassword = 'Passwords do not match';
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'Phone is Required';
  //   } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = 'Invalid Type Of Phone Number';
  //   }

  //   return errors;
  // }

  let mySchema = Yup.object({
    name: Yup.string()
      .required('Name is Required')
      .min(3, 'minimum length 3 char')
      .max(10, 'max is 10 char'),
    email: Yup.string().required('Email is Required').email('Invalid Email '),
    password: Yup.string()
      .required('Password is Required')
      .matches(/^[A-z][a-z0-9]{3,8}$/, 'Password Not Valid'),
    rePassword: Yup.string()
      .required('rePassword is Required')
      .oneOf([Yup.ref('password')], 'Not Match Password'),
    phone: Yup.string()
      .required('Number is Required')
      .matches(/^(002)?01[0125][0-9]{8}$/, 'Phone is Not Valid'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: mySchema,
    // validate,  => custom validate
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  async function registerForm(values) {
    setisLoading(true);
    return await axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((data) => {
        console.log('data', data.data.message);
        setuserMessage(data.data.message);
        //* Go to => Login
        setisLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        console.log('error', error.response.data.message);
        setisLoading(false);
        setuserError(error.response.data.message);
      });
  }
  return (
    <>
      <div className="container  mx-auto  py-20  px-5 md:px-0 max-w-screen-md">
        <h1 className="text-2xl font-bold mb-4 ">Register Now:</h1>
        {userError ? (
          <div
            className=" my-2 text-center font-bold p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200  dark:text-red-400"
            role="alert"
          >
            {userError}
          </div>
        ) : null}

        {userMessage ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg  bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {userMessage}
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2 ">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900  dark:text-black"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
            />
            {formik.touched.name && formik.errors.name ? (
              <div
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>

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
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="my-2">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              rePassword
            </label>
            <input
              name="rePassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="my-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              phone
            </label>
            <input
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
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
                className="bg-main  text-white border transition-all font-semibold px-4 my-3 py-3 rounded-lg"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </button>

            )}
            <div>
              <Link to="/login" className="text-sm  hover:text-blue-700">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
