// src/App.js

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Button, message } from 'antd';


import "./assets/styles/App.css";

function App() {
  const [img, setImg] = useState("");
  // const [upload, setUpload] = useState(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let loadingMessage = message.loading({
        type: "loading",
        content: "Sending message ...",
        duration: 0,
      });
  
      // Convert the image to base64
      const base64Image = await convertImageToBase64(img);
  
      // Make a POST request to your backend
      const response = await fetch("http://127.0.0.1:5000/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw_text: textareaValue,
          base64_image: base64Image,
        }),
      });
  
      const data = await response.json();
  
      console.log("Response from backend:", data);
  
      // Close the loading message
      loadingMessage();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const convertImageToBase64 = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
  
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        const base64Image = canvas.toDataURL("image/png");
  
        resolve(base64Image);
      };
  
      img.onerror = function (error) {
        reject(error);
      };
  
      img.src = imageUrl;
    });
  };

  return (
    <>
      <div className={`${darkMode ? "bg-gray-500" : "bg-gray-200"}`}>
        <Navbar darkMode={darkMode} />
        <div className="min-h-screen ">
          {/* <button onClick={()=>setUpload(!upload)}>{upload?"capture":"upload"}</button> */}
<form className="m-4 flex flex-col items-centr" onSubmit={handleSubmit}>

          <div className="m-4 flex flex-col justify-center items-cente">
            {img && (
              <div className="mt-4 flex justify-center">
                <img src={img} alt="Captured" className="w-80 h-[300px] rounded " />
              </div>
            )}

            {errors && <p className="text-red-500 mt-2">{errors}</p>}
          </div>
          <div className="m-4 flex flex-col justify-center items-center">
            <label className="text-lg font-medium mb-4">Capture Photo</label>
            <button>
              <input type="file"  onChange={takePhoto} accept="image/*" />
            </button>
          </div>


          <div className="m-4">
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={showTextarea}
                onChange={() => setShowTextarea(!showTextarea)}
                id="che"
              />
              <label htmlFor="che">Wanna ask me something?</label>
            </div>
            {showTextarea && (
              <div className="mt-5">
                <textarea
                  className="text-black border-2 w-full p-2 rounded-md"
                  placeholder={`Ask me something ${img? 'about your image?':''}`}
                  rows="5"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                ></textarea>
              </div>
            )}

            {textareaValue || img ?(

<button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">
            Lets see
          </button>
            ):null}

            {/* You can add other components as needed */}
          </div>
</form>

        </div>
      </div>
    </>
  );
}

export default App;
