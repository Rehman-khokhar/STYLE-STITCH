import React from "react";
import Layout from "../../Components/layout/Layout";
import UserMenu from "../../Components/layout/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name : {auth?.user?.user}</h3>
              <h3> Email : {auth?.user?.email}</h3>
              <h3> Number : {auth?.user?.phone}</h3>
              <h3>Address : {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
