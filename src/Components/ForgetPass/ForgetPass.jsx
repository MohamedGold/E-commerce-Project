import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ForgetPass() {
  const [step, setStep] = useState(1); // Track the current step: 1 = email, 2 = reset code, 3 = new password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation schema for new password
  const newPasswordSchema = Yup.object({
    newPassword: Yup.string()
      .required('Password is Required')
      .matches(/^[A-z][a-z0-9]{3,8}$/, 'Password Not Valid'),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validationSchema: newPasswordSchema,
    onSubmit: async (values) => {
      handleNewPasswordSubmit(values.newPassword);
    },
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email }
      );
      toast.success('Reset code sent to your email');
      setStep(2); // Move to the next step
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        { resetCode }
      );
      toast.success('Reset code verified');
      setStep(3); // Move to the next step
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to verify reset code'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (newPassword) => {
    setLoading(true);

    try {
      await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        { email, newPassword }
      );
      toast.success('Password reset successfully');

      // Redirect to the login page
      const loginUrl = `${window.location.origin}/login`;
      window.location.href = loginUrl;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto 2xl:container h-screen flex -mt-20 items-center justify-center max-w-screen-xl">
      <div className="flex flex-wrap flex-col justify-center items-center border py-20 w-full md:w-1/2 bg-slate-200 rounded-lg">
        <h1 className="text-3xl capitalize mb-10 border-b pb-3">
          {step === 1
            ? 'Forget Password'
            : step === 2
            ? 'Enter Reset Code'
            : 'Reset Password'}
        </h1>
        {step === 1 && (
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col w-full px-3 md:w-1/2 flex-wrap"
          >
            <input
              type="email"
              required
              className="rounded px-10 py-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-main my-5 p-2 text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Confirm'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleResetCodeSubmit}
            className="flex flex-col w-full px-3 md:w-1/2 flex-wrap"
          >
            <input
              type="text"
              required
              className="rounded px-10 py-5"
              placeholder="Reset Code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
            <button
              className="bg-main my-5 p-2 text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Confirm'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full px-3 md:w-1/2 flex-wrap"
          >
            <input
              type="password"
              required
              className="rounded px-10 py-5 mb-3"
              placeholder="New Password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div
                className="my-1 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
                role="alert"
              >
                {formik.errors.newPassword}
              </div>
            ) : null}
            <button
              className="bg-main my-5 p-2 text-white"
              type="submit"
              disabled={loading || !(formik.isValid && formik.dirty)}
            >
              {loading ? 'Loading...' : 'Confirm'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
