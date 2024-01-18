import React from "react";
import Layout from "../../Components/layout/Layout";
import AdminMenu from "../../Components/layout/AdminMenu";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/Forms/CategoryForm.jsx";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
  //  handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:1012/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} Category is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1012/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something get wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //  update category function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:1012/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //  daelete category function
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:1012/api/v1/category/Delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is Deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"DASHBOARD - CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row ">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-75">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name} </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
