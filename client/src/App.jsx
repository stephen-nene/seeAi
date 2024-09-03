import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { message } from "antd";
import Response from "./components/Response";

import "./assets/styles/App.css";

function App() {
  const [img, setImg] = useState("");
  const [errors, setErrors] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [response, setResponse] = useState(""); // State to hold server response

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
    let loadingMessage;

    try {
      loadingMessage = message.loading({
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Set the server response to state
      setResponse(data.output || "No output from server");

      // Close the loading message
      if (loadingMessage) loadingMessage();
    } catch (error) {
      console.error("Error:", error);
      if (loadingMessage) loadingMessage();
      message.error(`Error: ${error.message}`);
    }
  };

  const convertImageToBase64 = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.crossOrigin = "Anonymous"; // Handle cross-origin images
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const base64Image = canvas.toDataURL("image/png").split(",")[1]; // Remove the data URL prefix
        resolve(base64Image);
      };

      img.onerror = function (error) {
        reject(new Error("Failed to load image"));
      };

      img.src = imageUrl;
    });
  };

  return (
    <>
      <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
        <Navbar darkMode={darkMode} />
        <div className="container mx-auto px-4 py-8">
          <form
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col items-center">
              {img && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={img}
                    alt="Captured"
                    className="w-full max-w-xs h-auto rounded-lg border border-gray-300"
                  />
                </div>
              )}

              {errors && <p className="text-red-500 mb-4">{errors}</p>}
            </div>
            <div className="w-full mb-4 flex flex-col items-center">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <input
                type="file"
                onChange={takePhoto}
                accept="image/*"
                className="mb-4"
              />
                {/* Select Image */}
              </button>
            </div>

            {showTextarea && (
              <div className="w-full mb-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`Ask me something ${img ? "about your image?" : ""}`}
                  rows="5"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                ></textarea>
              </div>
            )}

            {textareaValue || img ? (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Let's See
              </button>
            ) : null}

            {/* Show the response if available */}
            {response && <Response output={response} />}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
