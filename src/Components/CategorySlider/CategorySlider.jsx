import React from 'react';
import styles from './CategorySlider.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    draggable: false,
    responsive: [
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  function getCategorySlider() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let { data } = useQuery({
    queryKey: ['categorySlider'],
    queryFn: getCategorySlider,
  });
  console.log(data?.data.data);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {/* <div className="container mx-auto   my-10 max-w-screen-xl 2xl:container  ">
        <h1 className="text-2xl my-5 font-bold">Show Popular Categories :</h1>
        <Slider {...settings}>
          {data?.data.data.map((cat) => (
            <div key={cat._id} className="text-center    mx-auto">
              <img
                src={cat.image}
                className="2xl:aspect-square  rounded     w-[200px] h-[200px] mx-auto   "
                alt=""
              />
              <p className="text-pretty text-[12px]  md:text-[16px] md:font-bold   py-3    ">
                {cat.name}
              </p>
            </div>
          ))}
        </Slider>
      </div> */}
      <div className="container mx-auto px-5 md:px-0 my-10 max-w-screen-xl ">
        <h1 className="md:text-2xl text-xl  text-center ms-5 xl:ms-10  md:text-left my-5 font-bold">
          Show Popular Categories :
        </h1>
        <Slider {...settings}>
          {data?.data.data.map((cat) => (
            <Link key={cat._id} onClick={() => scrollToTop()} to={'category'}>
              <div
                key={cat._id}
                className="text-center cursor-pointer mx-auto w-full"
              >
                <img
                  src={cat.image}
                  className="w-full h-auto rounded aspect-square mx-auto"
                  alt=""
                />
                <p className="text-pretty text-sm md:text-lg md:font-bold py-3">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
}
