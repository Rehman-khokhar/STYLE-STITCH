import { useState } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../Components/layout/Layout";
import "../../Style/Authstyle.css";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong Email or Password");
    }
  };
  return (
    <Layout title={"Login -S&SS"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN NOW</h4>

          <div className="mb-3">
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Create Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
