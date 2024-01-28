import React, { useState, useEffect, Profiler } from "react";
import Layout from "../../Components/layout/Layout";
import UserMenu from "../../Components/layout/UserMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  //  getUser data
  useEffect(() => {
    const { user, email, phone, address } = auth.user;
    setEmail(email), setName(user), setPhone(phone), setAddress(address);
  }, [auth?.user]);

  //  handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("some error happend");
    }
  };
  return (
    <Layout title={"DASHBOARD - Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <h4 className="title"> {"User Profile"}</h4>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter your Name"
                    disabled
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
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Password"
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
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
