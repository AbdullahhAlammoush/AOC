import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Home = () => {
  const token = sessionStorage.getItem("token");
  const user_id = sessionStorage.getItem("user_id");
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const getAllComments = (e) => {
    axios
      .get(`http://localhost:5000/comment/get/${e}`)
      .then((result) => {
        if (result) {
          console.log(result);
          setAllComments(result.data.result);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleShow = (e) => {
    axios
      .get(`http://localhost:5000/myItems/getOneItem/${e}`)
      .then((result) => {
        if (result) {
          console.log(result);
          setUrl(result.data.result[0].item_image);
          setPrice(result.data.result[0].price);
          setName(result.data.result[0].name_of_item);
          getAllComments(e);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    setShow(true);
    console.log(e);
  };
  useEffect(() => {
    if (!token) {
      navigate("../login");
    }
  }, []);
  const getAllItems = () => {
    axios
      .get("http://localhost:5000/items/get")
      .then((result) => {
        if (result) {
          console.log(result);
          setAllItems(result.data.result);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const addCommentFucntion = (e) => {
    axios
      .post(`http://localhost:5000/comment/add/${user_id}`, { comment, e })
      .then((result) => {
        if (result) {
          console.log(result);
          getAllComments(e);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getAllItems();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div id="main_contianer">
        {allItems.map((element, i) => {
          return (
            <div className="item_holder" key={i}>
              <img
                id={element.id}
                className="images"
                src={element.item_image}
                onClick={(e) => {
                  handleShow(e.target.id);
                }}
              ></img>

              <div>
                {/* <button id={element.id}>Add to cart</button>
                <button id={element.id}>Add to favorit</button> */}
                {/* <button
                  id={element.id}
                  variant="primary"
                  onClick={(e) => {
                    handleShow(e.target.id);
                  }}
                >
                  Add comment{" "}
                </button> */}
              </div>
              <h5>{element.name_of_item}</h5>
              <h5>{element.price} JD</h5>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <div id="insideModal">
                  <img className="images" src={url}></img>
                  <h3>{name}</h3>
                  <h3>{price} JD</h3>

                  {/* <div id="inputs_holder">
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        placeholder="Item description"
                        className="form-control"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      id={element.id}
                      className="btn btn-primary btn-block mb-4"
                      onClick={(e) => {
                        addCommentFucntion(e.target.id);
                      }}
                    >
                      Add comment
                    </button>
                  </div> */}
                </div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button> */}
                </Modal.Footer>
              </Modal>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Home;
