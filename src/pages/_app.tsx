import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress showOnShallow={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
