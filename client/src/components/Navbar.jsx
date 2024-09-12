import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Import the icons

import { setDarkMode } from "../store/actions/appAction";

export default function Navbar({ darkMode }) {
  const dispatch = useDispatch();



  return (
    <nav className={`${darkMode ? " bg-gray-800 text-black" : "bg-blue-700 text-white"}  p-4 sticky top-0`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">

          {/* Logo or any other branding */}
          <Link to="/" className="text-white font-bold text-lg ml-2">
            SeeAI
          </Link>
        </div>

        {/* Navigation links */}
        <div className="hiddn lg:flexs space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/See" className="text-white">
            See
          </Link>
        </div>

        {/* Dark mode toggle button */}
        <button
          onClick={()=>dispatch(setDarkMode(!darkMode))}
          className={`${darkMode ? " bg-white text-black" : "text-white"} ml-2 lg:ml-4`}
          title='dd'
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
