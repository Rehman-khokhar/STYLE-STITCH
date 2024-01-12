import React from "react";

import { Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - ShopNow"}>
      <div className=" row aboutus">
        <div className="col-md-6">
          <img
            src="/client/public/images/About-Us-PNG-Free-Download.png"
            alt="about us"
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-4 mt-5 text-white text-center">About us</h1>
          <p className="mt-3 text-center">
            To learn About ShopNOW for business , Guarantee & Sustainbility,
          </p>
          <p className="  btncontact mt-3 text-center ">
            <Link
              style={{
                textDecoration: "underline",
                color: "black",
              }}
              to="/contact"
            >
              CONTACT US
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default About;
