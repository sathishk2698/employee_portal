import React, { useCallback, useEffect } from "react";
import Login from "./components/Login/login";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import "./App.css";

const App = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const userInfo = sessionStorage.getItem("userInfo");
  const path = location.pathname;

  useEffect(() => {
    if (!userInfo) {
      return navigate("/");
    } else if (userInfo && path === "/") {
      return navigate("/dashboard");
    }
  }, [userInfo, path]);

  const logoutHandler = useCallback(()=>{
    sessionStorage.clear();
    return navigate("/");
  },[]);

  return (
    <div className="App">
      {userInfo && <div className="logoutContainer">
        <button className="logout" onClick={logoutHandler}>
          Log out
        </button>
      </div>}
      <Routes>
        <Route extact path="/" element={<Login />} />
        <Route extact path="/dashboard" element={<Dashboard />} />
        <Route extact path="/employee-view/:id" element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
};

export default App;
