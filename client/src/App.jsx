import { Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Auth/Login.jsx";

import PageNotFound from "./pages/PageNotFound.jsx";
import Order from "./pages/Order.jsx";
import Register from "./pages/Auth/Register.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
