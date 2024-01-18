import React from "react";
import Layout from "../Components/layout/Layout";
import { useAuth } from "../context/Auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
