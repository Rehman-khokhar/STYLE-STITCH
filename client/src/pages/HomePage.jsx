import React, { useState, useEffect } from "react";
import Layout from "../Components/layout/Layout";
import { useCart } from "../context/Cart";

import axios from "axios";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

import { AiOutlineReload } from "react-icons/ai";
import toast from "react-hot-toast";
import "../Style/Homepage.css";
import SearchInput from "../Components/Forms/SearchInput";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // filter product by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      console.log("data", data);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);
  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  // get filters product by prices or categ
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filter`,
        { checked }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All product -best offer"}>
      {/* banner image */}
      <div col-md-3></div>

      <div className=" col-md-5 container search navbar-nav ms-auto mb-8 mb-lg-0 text-center">
        <h2>
          <b>
            Search your One from <span>Thousand</span> of products
          </b>
        </h2>
        <SearchInput />
      </div>
      <div className="col-md-4"></div>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <div className="d-flex flex-column">
            <h4 className="text-center mb-4 ">FILTER BY CATEGORY</h4>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-success"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="col-md-9 ">
          <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-us", {
                        style: "currency",
                        currency: "PKR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn loadmore btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
