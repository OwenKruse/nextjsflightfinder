import '../styles/globals.css'
import "tailwindcss/tailwind.css"
import store from './search/store';
import { Provider } from 'react-redux';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp
