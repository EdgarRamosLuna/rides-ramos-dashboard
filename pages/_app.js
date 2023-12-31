// pages/_app.js
import { MainContextProvider } from '../context/MainContext';
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>      
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
