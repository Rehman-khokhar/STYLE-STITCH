import React from "react";
import Layout from "../Components/layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact us - ShopNow"}>
      <div className="row contact us">
        <div className="col-md-6">
          <img
            src="/client/public/images/pngwing.com (3).png"
            alt="contact img"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-4 mt-5 text-white text-center">
            CONTACT US
          </h1>
          <p className="text-justify mt-4">
            Any Query and info about product toll free to call anytime we 24/7
            AVAILABLE
          </p>
          <p className="mt-3">www.help@shopnow.com</p>
          <p className="mt-3">056-88776633 (toll-free)</p>
          <p className="mt-3">0325-4546646</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
