import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDirectionsRun } from "react-icons/md";

const Spinner = ({ path = "/login" }) => {
  const [count, setCount] = useState(3);
  const nevigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const intervel = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      nevigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(intervel);
  }, [count, nevigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">
          {" "}
          <MdDirectionsRun /> Redirecting to you in {count} Second.
        </h1>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
