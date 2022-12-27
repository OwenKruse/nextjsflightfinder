import '../styles/globals.css'
import "tailwindcss/tailwind.css"
import store from './search/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MantineProvider } from '@mantine/core';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function MyApp({ Component, pageProps }) {
  return (
      <MantineProvider colorScheme={'light'}
                       withGlobalStyles
                       withNormalizeCSS

      >
    <ThemeProvider theme={lightTheme}>
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
    </ThemeProvider>
        </MantineProvider>
  );
}
export default MyApp
