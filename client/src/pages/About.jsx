import React from "react";

import { Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import { GiClick } from "react-icons/gi";

const About = () => {
  return (
    <Layout title={"S&S-ABOUT"}>
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
            Introducing <b>"STITCH & STYLE,"</b> your premier online fashion
            destination where style meets convenience. Browse our curated
            collection of trendy apparel, from casual chic to sophisticated
            elegance, all from the comfort of your home. Elevate your wardrobe
            effortlessly with our seamless online shopping experience at
            ThreadHub – where fashion and ease come together.{" "}
            <b>
              {" "}
              To learn About STYLE & STITCH for business , Guarantee &
              Sustainbility contact us our support Team{" "}
            </b>
          </p>
          <p className="  btncontact mt-3 text-center ">
            <Link
              style={{
                textDecoration: "underline",
                color: "black",
                fontSize: "24px",
              }}
              to="/contact"
            >
              Support Team <GiClick />
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default About;
