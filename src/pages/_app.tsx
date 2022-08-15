import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { theme } from "../styles/theme";
import GlobalStyles from "../styles/global";
import { AuthProvider } from "../contexts/AuthContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
