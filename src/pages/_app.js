import { SessionProvider } from "next-auth/react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BackTop from "@/components/common/BackTop";
import { ToastContainer } from "react-toastify";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.scss";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <ToastContainer />
        <Header />
        <Head>
          <title>NextAudio | The Perfect Audio Store</title>
          <meta

            name="description"
            content="NextAudio is a NextJS based eCommerce template for selling audio products."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="author" content="Mehmet F. Dogan" />

        </Head>
        <div className="main-container">
          <div className="main-content">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <BackTop />
      </SessionProvider>
    </>
  );
}
