import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";

import PageNotFound from "./pages/PageNotFound.jsx";
import Order from "./pages/Order.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./Components/layout/routes/PrivateRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminRoute from "./Components/layout/routes/AdminRoute.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Users from "./pages/Admin/Users.jsx";
import UserOrders from "./pages/user/UserOrders.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import Products from "./pages/Admin/Products.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import Categaries from "./pages/Categaries.jsx";
import CategoryList from "./pages/CategoryList.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminOrder from "./pages/Admin/AdminOrder.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<DetailPage />} />
        <Route path="/categories" element={<Categaries />} />
        <Route path="/category/:slug" element={<CategoryList />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/Search" element={<SearchPage />} />
        {/* for dash board */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>
        {/* <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/Product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-users" element={<Users />} />
        </Route> */}

        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="admin/create-users" element={<Users />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/Order" element={<Order />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
