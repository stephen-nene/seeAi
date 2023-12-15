// src/App.js

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";

import "./assets/styles/App.css";

function App() {
  const [img, setImg] = useState("");
  const [upload, setUpload] = useState(true);
  const [errors, setErrors] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const darkMode = useSelector((state) => state.app.darkMode);

  const takePhoto = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const photoDataUrl = URL.createObjectURL(file);
        setImg(photoDataUrl);
      }
    } catch (error) {
      setErrors("Error accessing camera: " + error.message);
      console.error("Error accessing camera:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Log the data in the console
    console.log('Image:', img);
    console.log('Textarea:', textareaValue);
  };


  return (
    <>
      <div className={`${darkMode ? "bg-gray-500" : "bg-gray-200"}`}>
        <Navbar darkMode={darkMode} />
        <div className="min-h-screen ">
          {/* <button onClick={()=>setUpload(!upload)}>{upload?"capture":"upload"}</button> */}
<form className="m-4 flex flex-col items-centr" onSubmit={handleSubmit}>

          <div className="m-4 flex flex-col justify-center items-center">
            <label className="text-lg font-medium mb-4">Capture Photo</label>
            <button>
              <input type="file" required onChange={takePhoto} accept="image/*" />
            </button>
          </div>

          <div className="m-4 flex flex-col justify-center items-cente">
            {img && (
              <div className="mt-4">
                <img src={img} alt="Captured" className="w-full rounded" />
              </div>
            )}

            {errors && <p className="text-red-500 mt-2">{errors}</p>}
          </div>

          <div className="m-4">
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={showTextarea}
                onChange={() => setShowTextarea(!showTextarea)}
                id="che"
              />
              <label htmlFor="che">Ask SeeAi?</label>
            </div>
            {showTextarea && (
              <div className="mt-5">
                <textarea
                  className="text-black border-2 w-full p-2 rounded-md"
                  placeholder="Ask me something about your image?"
                  rows="5"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                ></textarea>
              </div>
            )}

<button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">
            Lets see
          </button>
            {/* You can add other components as needed */}
          </div>
</form>

        </div>
      </div>
    </>
  );
}

export default App;
