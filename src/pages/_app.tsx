import { GlobalStyles } from "@/components/ShoppingList/styles";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/globals.css";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
