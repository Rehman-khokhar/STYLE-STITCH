import React from "react";

import { Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";

const Order = () => {
  return (
    <Layout title={"S&S-HOW TO ORDER"}>
      <div className="container">
        <div className="heading mt-5">
          {" "}
          <h3>How to Order</h3>
        </div>
        <div className="mt-2">
          <p>
            <span style={{ fontWeight: "700" }}>Step 1.</span> Log in or create
            an account for the best experience. Choose your product and select a
            color. You can order multiple sizes and colors from the same page.{" "}
          </p>
        </div>
        <div className="mt-2">
          <p>
            <span style={{ fontWeight: "700" }}>Step 2.</span> Enter sizes and
            quantities for the selected color by entering a number in the
            corresponding size field. You can click the plus icon beneath the
            field to see the backordered stock. You can check the inventory
            status for all sizes in your selected color by checking the “Show
            backordered stock that will become available” box.
          </p>
        </div>
        <div className="mt-2">
          <p style={{ fontWeight: "400" }}>
            <span style={{ fontWeight: "700" }}>Step 3.</span> Step 3. Add a
            logo or choose “No Logo” First, select the logo placement from the
            dropdown. Click the “Add Logo” button. If you are not logged in you
            will be prompted to log in, create an account or upload up to two
            logos as a guest.
            <p>
              When you shop as a guest, your logos and shopping bag will not be
              saved when you leave the site.
            </p>
            <p>
              Once logged in, upload a file from your PC or choose an approved
              logo if you have one. You can also choose a previously uploaded
              logo. The logo will either preview on your selected product or on
              a swatch.
            </p>
            <p>
              The Shopping Bag icon on the upper right of the page will also
              show the number of items (excluding fees) in your bag. You will be
              able to review and edit your selections in the Shopping Bag before
              you check out. You can also click the “Email a Quote” button to
              send yourself and up to three colleagues a summary of your
              Shopping Bag before submitting your order.{" "}
            </p>
          </p>
        </div>
        <hr />
        <div className="heading mt-4">
          <h4> Maximize Savings by Ordering 6 or More Units + free shipment</h4>
        </div>
        <p style={{ fontWeight: "400" }} className="mt-2 ">
          A 150 RS Shipmentfee is applied to each product with less than 6 units
          if:
          <ul className="mt-1">
            <li>The units are embroidered, and</li>
            <li className="mt-1">
              The order total qualifies for a volume discount
            </li>
          </ul>
        </p>
        <hr />
        <div className="heading mt-3">
          <h4>How to Email a Quote </h4>
        </div>
        <p className="mt-1">
          Follow the How to Order instructions above, and then click the "Email
          a Quote" Button in the Shopping Bag to email an order quote without
          placing your order.
        </p>
        <ul>
          <li>
            To save your shopping bag selections for a future order, please
            create an account or log in.
          </li>
          <li>Registering is required to email your quote.</li>
          <li>
            Please note: If you leave the product page without adding items to
            your Shopping Bag, you will lose the selections you have made.
          </li>
          <li>
            For help with your quote, please call one of our Account
            Representatives at 056-88776633.
          </li>
        </ul>
        <hr />
        <div className="heading mt-3">
          <h4>Inventory</h4>
        </div>
        <p style={{ fontWeight: "400" }}>
          L.L.Bean for Business makes it easy for you to place large orders by
          providing current inventory levels across sizes and colors for all
          products. Due to timing of order activity, this information might not
          be up to date at the moment when you are shopping the site.
          <span style={{ fontWeight: "700" }}>
            Adding products to your Shopping Bag and clicking “Place Order” does
            not guarantee inventory availability.
          </span>
          We will do our best to fill your order. In the event that we are
          unable to, our representatives will help you find the perfect
          replacement. At L.L.Bean for Business, we strive to give you the best
          service in the industry so you and your team can simply step outside.
        </p>
      </div>
      <div className=" col-lg-12 mt-3  signup" style={{ padding: "30px" }}>
        <div
          className=" text-light text-center
        "
        >
          <h5 className="heading">Sign up for buy product or query</h5>
          <p>Learn about exclusive sales, special offers and more.</p>
          <Link
            className="col-lg-3 ms-auto pnf-btn text-white"
            style={{ border: "1px solid white" }}
            to="/"
          >
            HOME PAGE
          </Link>
        </div>
      </div>

      <hr />
    </Layout>
  );
};

export default Order;
