import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signUp.css";
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const signUpFucntion = () => {
    axios
      .post(`http://localhost:5000/user/add`, {
        first_name,
        last_name,
        username,
        password,
      })
      .then((result) => {
        if (result) {
          console.log(result);
          navigate("../login");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <div id="signInForm">
        <form id="formItSelf">
          {/* <!-- FirstName input --> */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="firsName"
              className="form-control"
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form2Example2">
              First name
            </label>
          </div>
          {/* <!-- LastName input --> */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form2Example2"
              className="form-control"
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form2Example2">
              Last name
            </label>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form2Example1">
              Username{" "}
            </label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* <!-- Submit button --> */}
          <button
            type="button"
            id="signInBTN"
            className="btn btn-primary btn-block mb-4"
            onClick={signUpFucntion}
          >
            Sign Up
          </button>

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>
              Not a member? <a href="../login">sign</a>
            </p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>{" "}
      </div>
    </>
  );
};
export default Signup;
