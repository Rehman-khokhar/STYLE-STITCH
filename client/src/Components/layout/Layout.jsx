import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, keywords, author, description }) => {
  return (
    <div>
      <div>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </div>

      <Header />
      <Toaster />

      <main style={{ minHeight: "70vh" }}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
