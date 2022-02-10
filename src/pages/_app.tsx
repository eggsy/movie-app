import Head from "next/head";

// Import Tailwind CSS
import "../styles/tailwind.css";

// Types
import type { AppProps } from "next/app";

// Components
import Navbar from "../components/Navbar";

// Meta
const meta = {
  title: "Movie App",
  description: "Very good movie app.",
};

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

      <div className="min-h-screen bg-gray-100/90 backdrop-blur-md backdrop-filter">
        <Navbar />

        <div className="container py-10 mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MovieApp;
