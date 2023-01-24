import '../styles/globals.css'
import "tailwindcss/tailwind.css"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MantineProvider } from '@mantine/core';


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
        <Component {...pageProps} />
    </ThemeProvider>
        </MantineProvider>
  );
}
export default MyApp
