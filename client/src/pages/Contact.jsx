import React from "react";
import Layout from "../Components/layout/Layout";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneForwarded } from "react-icons/md";
import { MdMobileFriendly } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <Layout title={"S&S-Contact"}>
      <div className="row contact us">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h1 className="bg-dark p-4 mt-5 text-white text-center">
            CONTACT US
          </h1>
          <p className=" text-center mt-4">
            Any Query and info about product toll free to call anytime we 24/7
            AVAILABLE
          </p>
          <p className="mt-3 text-center">
            <MdOutlineEmail /> www.help@shopnow.com
          </p>
          <p className="mt-3 text-center">
            {" "}
            <MdOutlinePhoneForwarded /> 056-88776633 (toll-free)
          </p>
          <p className="mt-3 text-center">
            {" "}
            <MdMobileFriendly /> 0325-4546646 / 0314-4018018
          </p>
          <p className="mt-3 text-center">
            {" "}
            <MdOutlineLocationOn /> Fectory Outlet - MAROOF Stitch & style{" "}
            <br /> Nankana Sahib
          </p>
        </div>
        <div className="col-md-4"></div>
      </div>
    </Layout>
  );
};

export default Contact;
