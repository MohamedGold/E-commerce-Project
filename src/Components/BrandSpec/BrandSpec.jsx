import React, { useEffect, useState } from 'react';
import styles from './BrandSpec.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
export default function BrandSpec() {
  const [brand, setBrand] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  async function getSpecBrand() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((response) => {
        console.log(response.data?.data);
        setBrand(response.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSpecBrand();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container 2xl:container mx-auto  text-center max-w-screen-xl">
          <Link  to={'/brand'}>
            <button className="hover:text-[var(--main-color)] transition mt-10 p-3">
              <i className="fa-solid fa-arrow-left-long me-2  "></i>Go Back
            </button>
          </Link>

          <div className="flex flex-wrap items-center mx-5 lg:mx-0    justify-center">
            <div className="border p-10 px-20   rounded-lg  my-10 shadow-3xl">
              <img src={brand.image} alt={brand.name} />
              <h1>{brand.name}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
