import React from "react";

import { Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import { TbFaceIdError } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout title={"Page not found - S&S"}>
      <div className="pnf">
        <h1 className="pnf-title">
          {" "}
          <TbFaceIdError />
          404
        </h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/" className="pnf-btn" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack /> Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
