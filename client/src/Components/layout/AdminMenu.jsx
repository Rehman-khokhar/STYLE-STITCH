import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h4>Admin Penal</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item"
          >
            Create products
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-users"
            className="list-group-item"
          >
            Users
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;