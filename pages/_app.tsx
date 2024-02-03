import { AppProps } from 'next/app';
import "../src/app/globals.scss";
import "./Components/Button/button.scss";
import "./Components/Header/header.scss";
import { CartProvider } from './Context/CartContext';
import Header from './Components/Header/header';
import Cart from './Components/Cart/Cart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Cart />
    </CartProvider>
  );
}

export default MyApp;
