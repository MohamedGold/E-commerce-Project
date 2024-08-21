import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllCategories() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) => {
        console.log(response.data.data);
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <HelmetProvider>
        <div className="container max-w-screen-xl flex  flex-wrap md:w-full  px-5 md:px-3    mx-auto ">
          {loading ? (
            <Loader />
          ) : (
            <>
              {categories.map((cat) => (
                <div
                  className="w-full md:w-1/3 lg:w-1/5  hover:shadow-3xl hover:shadow-[var(--main-color)]   px-5 my-3 transition-all duration-300  card-box relative  "
                  key={cat._id}
                >
                  <Helmet>
                    <title>Categories</title>
                  </Helmet>
                  <Link to={`/category/${cat._id}`}>
                    <img
                      src={cat.image}
                      className="w-full  aspect-square rounded-lg"
                      alt={cat.name}
                    />
                    <h2 className="text-2xl text-center my-2 font-bold">
                      {cat.name}
                    </h2>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </HelmetProvider>
    </>
  );
}
