import React from "react";
import Layout from "../../Components/layout/Layout";
import UserMenu from "../../Components/layout/UserMenu";

const UserOrders = () => {
  return (
    <Layout title={"DASHBOARD - Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
