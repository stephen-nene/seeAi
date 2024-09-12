import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import LandingPage from "./components/LandingPage";
import See from "./components/See";

import "./assets/styles/App.css";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        } min-h-screen`}
      >
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mt-8">

        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/see" element={<See darkMode={darkMode}/>} />
        </Routes>
</div></div>

        {/* <Navbar darkMode={darkMode} />
        <LandingPage darkMode={darkMode} /> */}
      </div>
    </>
  );
}

export default App;
