import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import AuthLayout from "../components/Layout/AuthLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthLayout>
      <NextNProgress
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
      <ToastContainer theme="dark" />
    </AuthLayout>
  );
}

export default MyApp;
