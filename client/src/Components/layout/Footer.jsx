import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h6 className="text-center right">
        <b>All rights Reserved &copy; R3C</b>
      </h6>
      <p className="text-center mt-3">
        <Link to="/contact">
          <b>CONTACT</b>{" "}
        </Link>
        |
        <Link to="/Order">
          <b>HOW TO ORDER</b>
        </Link>
        |
        <Link to="/about">
          <b>ABOUT</b>
        </Link>
      </p>
    </div>
  );
};

export default Footer;
