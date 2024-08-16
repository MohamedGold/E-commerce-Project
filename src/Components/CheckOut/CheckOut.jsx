import React, { useContext, useEffect, useState } from 'react';
import styles from './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { CartContext } from '../../Context/CartContext';
import { useLocation } from 'react-router-dom';

export default function CheckOut() {
  let { checkOutOnline, checkOutCash } = useContext(CartContext);
  const [isLoading, setisLoading] = useState(false);

  const [paymentType, setPaymentType] = useState(null);

  useEffect(() => {
    setPaymentType(state.type);
  }, []);
  let { state } = useLocation();
  console.log(state.type);
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    details: Yup.string().required('Details are required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must be a number'),
    city: Yup.string().required('City is required'),
  });

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema, // Add validation schema
    onSubmit: (values) => {
      payNow(values);
    },
  });

  async function payNow(values) {
    setisLoading(true);
    if (paymentType == 'Online Payment') {
      await checkOutOnline(values);
    } else {
      await checkOutCash(values);
    }
  }

  return (
    <>
      <div className="container mx-auto px-10 pt-10 lg:px-0 max-w-screen-md">
        <h1 className="text-main text-center mb-5 text-2xl font-bold ">
          {paymentType}
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Details:
            </label>
            <input
              name="details"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
            />
            {formik.touched.details && formik.errors.details ? (
              <div
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                role="alert"
              >
                {formik.errors.details}
              </div>
            ) : null}
          </div>

          <div className="my-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Phone:
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
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="my-2">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              City:
            </label>
            <input
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent"
            />
            {formik.touched.city && formik.errors.city ? (
              <div
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                role="alert"
              >
                {formik.errors.city}
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
                className="bg-main text-white px-4 py-3 rounded-lg"
                disabled={!formik.isValid || !formik.dirty} // Disable button if form is not valid or not dirty
              >
                Pay Now
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
