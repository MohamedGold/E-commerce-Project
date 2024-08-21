import React from 'react';
import styles from './Home.module.css';
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet, HelmetProvider } from 'react-helmet-async';
export default function Home() {
  return (
    <>
      <HelmetProvider>
        <MainSlider />
        <CategorySlider />
        <FeatureProducts />
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
}
