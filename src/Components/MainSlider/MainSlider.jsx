import React from 'react';
import styles from './MainSlider.module.css';
import slider1 from './../../assets/grocery-banner.png';
import slider2 from './../../assets/grocery-banner-2.jpeg';
import slider3 from './../../assets/slider-image-1.jpeg';
import slider4 from './../../assets/slider-image-2.jpeg';
import slider5 from './../../assets/slider-2.jpeg';
import slider6 from './../../assets/slider-image-3.jpeg';
import Slider from 'react-slick';
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <>
      <div className="container mx-auto  px-3   max-w-screen-xl  my-10 ">
        <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap mx-auto">
          <div className="container  md:w-3/4 mb-8 mx-auto ">
            <Slider {...settings}>
              <img src={slider4} className="h-[300px]" alt="" />
              <img src={slider6} className="h-[300px]" alt="" />
              <img src={slider3} className="h-[300px]" alt="" />
            </Slider>
          </div>
          <div className="container md:1/4 mx-auto">
            <img src={slider1} className="w-full h-[150px]" alt="" />
            <img src={slider2} className="w-full h-[150px]" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
