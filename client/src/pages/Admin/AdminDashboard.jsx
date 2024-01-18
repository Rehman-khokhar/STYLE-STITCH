import React from "react";
import Layout from "./../../Components/layout/Layout";
import AdminMenu from "../../Components/layout/AdminMenu";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row ">
          <div class="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>ADMIN Name : {auth?.user?.user}</h3>
              <h4> Email : {auth?.user?.email}</h4>
              <h4> Phonenumber : {auth?.user?.phone}</h4>
              <h4> Address : {auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
