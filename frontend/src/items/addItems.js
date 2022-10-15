import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addItems.css";
const AddItems = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("../login");
    }
  }, []);
  const [name_of_item, setName_of_item] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [item_image, setItem_image] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "AbdHusseinCloudinary");
    data.append("cloud_name", "noneforcscbeyond");
    fetch("  https://api.cloudinary.com/v1_1/noneforcscbeyond/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setItem_image(data.url);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const user_id = sessionStorage.getItem("user_id");
  const uploadItemFunction = () => {
    axios
      .post(`http://localhost:5000/items/add/${user_id}`, {
        name_of_item,
        price,
        item_image,
      })
      .then((result) => {
        if (result) {
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <div id="main_container">
        <div>
          <div>
            <div id="image_holder">
              <img id="image" src={item_image} />
            </div>
            <h6>Uploaded image will be displayed here</h6>

            <input
              className="inputs"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <button onClick={uploadImage}>Upload</button>
          </div>
        </div>
        <div id="inputs_holder">
          <div className="form-outline mb-4">
            <input
              type="text"
              placeholder="Item description"
              className="form-control"
              onChange={(e) => {
                setName_of_item(e.target.value);
              }}
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="number"
              placeholder="price"
              className="form-control"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            id="addItem"
            className="btn btn-primary btn-block mb-4"
            onClick={uploadItemFunction}
          >
            Add item
          </button>
        </div>
      </div>
    </>
  );
};
export default AddItems;
