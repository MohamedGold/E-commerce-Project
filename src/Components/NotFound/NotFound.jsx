import React from 'react';
import error from '../../assets/Error.jpg';
import styles from './NotFound.module.css';
export default function NotFound() {
  return (
    <>
      <div className="container mx-auto w-[600px] text-center">
        <img src={error} className='w-full' alt="error" />
      </div>
    </>
  );
}
