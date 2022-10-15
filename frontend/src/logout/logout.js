import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

import "./logout.css";
const LogOut = () => {
  const clearLocal = () => {
    sessionStorage.clear();
    {
      // if (!token) {
      //   // document.location.reload(true);
      // }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div id="logoutContainer">
        <div>
          <p id="logoutText">Do you want to logout ?</p>
          <Link to={"/login"}>
            <button id="logoutButton" onClick={clearLocal}>
              logout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default LogOut;
