import { useState } from "react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../Components/layout/Layout";
import "../../Style/Authstyle.css";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  // const [question, setQuestion] = useState("");
  const Navigate = useNavigate();

  //   form function
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(name, email, phone, address, password);
  //     toast.success("Register successfully");
  //   };

  //  handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        Navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("some error happend");
    }
  };

  return (
    <Layout title={"RegisterNow -ShopNow"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h4 className="title"> Register Now</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your Name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your PhoneNumber"
              required
            />
          </div>
          <div
            className="mb
          -3"
          >
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your Address"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
