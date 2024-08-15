import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import CounterContextProvider from './Context/CounterContext.jsx';
import TokenContextProvider from './Context/TokenContext.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import WishlistContextProvider from './Context/WishlistContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <WishlistContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CounterContextProvider>
      </CartContextProvider>
    </WishlistContextProvider>
  </TokenContextProvider>
);
