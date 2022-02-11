import Head from "next/head";
import Router from "next/router";

// NProgress
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Import Tailwind CSS
import "../styles/tailwind.css";

// Types
import type { AppProps } from "next/app";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Meta
const meta = {
  title: "Movie App",
  description: "Very good movie app.",
};

// NProgress settings and events
NProgress.configure({
  showSpinner: true,
  parent: "body",
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done(true));
Router.events.on("routeChangeError", () => NProgress.done(true));

function MovieApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="theme-color" content="#1D556F" />
        <link rel="icon" href="/favicon.png" />

        {/* Open-Graph */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />

        {/* Twitter */}
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>

      <div className="min-h-screen bg-white/90 backdrop-blur-md">
        <Navbar />

        <div className="container min-h-screen py-10 mx-auto">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
}

// TODO Search, categories and stuff
// TODO Studio pages
// TODO fix missing animation on title names of cards

export default MovieApp;
