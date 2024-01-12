import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h6 className="text-center">All rights Reserved &copy; R3C</h6>
      <p className="text-center mt-3">
        <Link to="/contact">CONTACT </Link>|
        <Link to="/Order">HOW TO ORDER</Link>|<Link to="/about">ABOUT</Link>
      </p>
    </div>
  );
};

export default Footer;
