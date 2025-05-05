import { GlobalStyles } from "@/components/ShoppingList/styles";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/globals.css";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  )
}
