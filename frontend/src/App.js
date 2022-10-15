import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Signup from "./signup/signUp";
import Home from "./home/home";
import AddItems from "./items/addItems";
import MyItems from "./myItems/myItems";
import LogOut from "./logout/logout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/items" element={<AddItems />}></Route>
          <Route path="/myItems" element={<MyItems />}></Route>
          <Route path="/logout" element={<LogOut />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
