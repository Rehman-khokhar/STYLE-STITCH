import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, keywords, author, description }) => {
  return (
    <div className="colors">
      <div>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </div>
      <div className="style">
        <Header />
        <Toaster />

        <main style={{ minHeight: "75vh" }}>{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
