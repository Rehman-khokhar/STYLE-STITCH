import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <ToastContainer />

      <main style={{ minHeight: "80vh" }}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
