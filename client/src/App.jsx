import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';

import './assets/styles/App.css';

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  const [img, setImg] = useState('');
  const [upload, setUpload] = useState(true);
  const [errors, setErrors] = useState('');
  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      setErrors('Error accessing camera: ' + error.message);
      console.error('Error accessing camera:', error);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL (base64-encoded PNG)
    const photoDataUrl = canvas.toDataURL('image/png');
    setImg(photoDataUrl);
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    // Stop all tracks to release the camera
    tracks.forEach((track) => track.stop());

    // Clear the photo
    setImg(null);
  };

  const dispatch = useDispatch();

  return (
    <div className={`bg-gray-100 min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} />
      <div className="m-4">
        {/* Switch to toggle upload state */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={upload}
            onChange={() => setUpload(!upload)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-lg font-medium">Upload</span>
        </label>

        {upload ? (
          <div className="mt-4">
            <video ref={videoRef} autoPlay className="w-full rounded" />
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={startCamera}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Start Camera
              </button>
              <button
                onClick={takePhoto}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Take Photo
              </button>
            </div>
          </div>
        ) : (
          <div>{/* camera capture function */}</div>
        )}
        {img && (
          <div className="mt-4">
            <img src={img} alt="Captured" className="w-full rounded" />
            <button
              onClick={stopCamera}
              className="bg-red-500 text-white py-2 px-4 mt-2 rounded"
            >
              Retake Photo
            </button>
          </div>
        )}
        {errors && <p className="text-red-500 mt-2">{errors}</p>}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Additional components (textarea, capture button, image preview) */}
      {/* Prompt textarea */}
      <textarea
        className="mt-4 p-2 border border-gray-300 rounded"
        placeholder="Enter your prompt here"
        rows="5"
        cols="30"
      ></textarea>

      {/* Capture button */}
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Capture
      </button>
    </div>
  );
}

export default App;
