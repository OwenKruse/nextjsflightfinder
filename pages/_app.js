import '../styles/globals.css'
import "tailwindcss/tailwind.css"
import store from './search/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
    </ThemeProvider>
  );
}
export default MyApp
