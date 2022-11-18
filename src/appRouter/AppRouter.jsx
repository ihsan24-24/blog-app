import React from "react";
import { Route, Routes } from "react-router-dom";
import CartDetail from "../components/CartDetail";
import NavbarComp from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NewBlock from "../pages/NewBlock";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <div>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<CartDetail />} />
        <Route path="/newpost" element={<NewBlock />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
