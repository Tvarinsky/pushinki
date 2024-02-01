import { AppProps } from 'next/app';
import "../src/app/globals.scss";
import "./Components/Button/button.scss";
import "./Components/Header/header.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
