import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const logInFucntion = () => {
    axios
      .post(`http://localhost:5000/signIn/`, { username, password })
      .then((result) => {
        if (result) {
          console.log(result);
          const decoded = jwt_decode(result.data.token);
          console.log(decoded.user_id);
          sessionStorage.setItem("user_id", decoded.user_id);
          sessionStorage.setItem("token", result.data.token);
          navigate("../")
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
              Username
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
            onClick={logInFucntion}
          >
            Sign in
          </button>

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>
              Not a member? <a href="../signUp">Register</a>
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
export default Login;
