// import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login } from "./Components/Auth";
import { Profile } from "./Components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="font-poppins container mx-auto py-10 flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
