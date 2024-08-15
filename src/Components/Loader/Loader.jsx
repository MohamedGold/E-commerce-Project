import React from 'react';
import styles from './Loader.module.css';
import { DNA, MutatingDots } from 'react-loader-spinner';
export default function Loader() {
  return (
    <>
      <div className="container h-screen mt-[-5rem] flex justify-center  items-center  mx-auto">
        <div className="">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </>
  );
}
