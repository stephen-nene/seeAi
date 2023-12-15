import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

import Navbar from "./components/Navbar";
import "./assets/styles/App.css";

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  const [img, setImg] = useState("");
  const [upload, setUpload] = useState(true); // Corrected typo in state variable
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please choose a valid image file.");
    }
  };

  useEffect(()=>{
    if (upload === !true) {
     navigator.mediaDevices.getUserMedia({ video: {width: 1920, height: 1080} })
     .then((stream) => {
      let video = document.getElementById('camerafeed')
      video.srcObject = stream
      video.play()
     })
     .catch((error) => {
      console.error('Error accessing camera:', error)
     })
    }
  },[upload])

  const handleCameraClick = async () => {
    try {
      message.success("Open photo taker...");
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div className="">
      <Navbar darkMode={darkMode} />
      <button onClick={() => setUpload(!upload)}>Switch Upload State</button>

      {upload ? (
        <>
          <input
            type="file"
            name=""
            id=""
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <>
        <video id="camerafeed" autoPlay></video>
          <button onClick={handleCameraClick}>Take a Photo</button>
        </>
      )}

      {img && (
        <>
          <img
            className="hover:cursor-pointer"
            src={img}
            alt="Preview"
            style={{ width: "100%", height: "auto" }}
          />
        </>
      )}

      <p>You can enter an optional prompt for your image above to give seeai</p>
      <textarea
        className="text-black border-2"
        placeholder="Prompt me here"
        cols="30"
        rows="5"
      ></textarea>

      <button className="">Let's See</button>
    </div>
  );
}

export default App;
