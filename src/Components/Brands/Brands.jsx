import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';
export default function Brands() {
  const [brandsItems, setBrandsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  async function getBrands() {
    return await axios
      .get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => {
        console.log(response.data?.data);
        setBrandsItems(response.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto  max-w-screen-xl">
          <div className="flex flex-wrap justify-center gap-x-3 text-center   pt-5 ">
            {brandsItems.map((brand) => (
              <div
                key={brand._id}
                className={` border  p-5 rounded-lg hover:shadow-3xl transition hover:shadow-[var(--main-color)] flex flex-col mx-auto mb-10 lg:w-1/5 `}
              >
                <Link to={`/brand/${brand._id}`}>
                  <img src={brand.image} alt={brand.name} />
                  <h3 className="mt-2 font-bold ">{brand.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
