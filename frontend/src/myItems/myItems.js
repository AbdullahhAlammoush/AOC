import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./myItems.css";
import { useNavigate } from "react-router-dom";
const MyItems = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);

  const [url, setUrl] = useState("");

  const [newPrice, setNewPrice] = useState("");
  const [newName, setNewName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("../login");
    }
  }, []);
  const user_id = sessionStorage.getItem("user_id");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    axios
      .get(`http://localhost:5000/myItems/getOneItem/${e}`)
      .then((result) => {
        if (result) {
          console.log(result);
          setUrl(result.data.result[0].item_image);
          setId(result.data.result[0].id);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    setShow(true);
    console.log(e);
  };
  const getAllItems = () => {
    axios
      .get(`http://localhost:5000/myItems/getMyItems/${user_id}`)
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

  const deleteMyItems = (e) => {
    axios
      .delete(`http://localhost:5000/items/delete/${e}`)
      .then((result) => {
        if (result) {
          console.log(result);
          getAllItems();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const editeMyItems = (e) => {
    axios
      .post(`http://localhost:5000/items/edite/${e}`, { newName, newPrice })
      .then((result) => {
        if (result) {
          console.log(result);
          getAllItems();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getAllItems();
  }, []);
  const deleteAndPrint = (e) => {
    deleteMyItems(e);
  };
  return (
    <>
      <Navbar></Navbar>
      <div id="main_contianer">
        {allItems.map((element, i) => {
          return (
            <div className="item_holder" key={i}>
              <img
                className="images"
                id={element.id}
                src={element.item_image}
                onClick={(e) => {
                  handleShow(e.target.id);
                }}
              ></img>
              <div>
                <button
                  className="my_button"
                  id={element.id}
                  onClick={(e) => {
                    deleteAndPrint(e.target.id);
                  }}
                >
                  Delete
                </button>
                <button
                  id={element.id}
                  variant="primary"
                  onClick={(e) => {
                    handleShow(e.target.id);
                  }}
                >
                  Edite
                </button>
              </div>
              <h5>{element.name_of_item}</h5>
              <h5>{element.price} JD</h5>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <div id="insideModal">
                  <img className="images" src={url}></img>
                  {/* <h3>{name}</h3>
                  <h3>{price} JD</h3> */}
                  <div id="inputs_holder">
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        placeholder="Item description"
                        className="form-control"
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="number"
                        placeholder="price"
                        className="form-control"
                        onChange={(e) => {
                          setNewPrice(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      id={element.id}
                      className="btn btn-primary btn-block mb-4"
                      onClick={(e) => {
                        console.log(e.target.id);
                        editeMyItems(id);
                      }}
                    >
                      Edite item
                    </button>
                  </div>
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
export default MyItems;
