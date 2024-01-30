import React from "react";
import Layout from "./../Components/layout/Layout";
import { useSearch } from "../context/Search";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"search result"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.result.length < 1
              ? "No Product Found"
              : `found ${values?.result.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4 ">
            {values?.result.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`https://average-glasses-foal.cyclic.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> {p.price} Rs</p>

                  <button className="btn btn-primary mb-2">More detail</button>
                  <button className="btn btn-secondary mb-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
