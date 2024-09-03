import React from "react";

export default function Process({ darkMode }) {
  return (
    <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} `}>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Step 1: Take a Photo"
            description="Capture a photo using your camera or upload an image from your computer."
          />
          <Card
            title="Step 2: Send to Server"
            description="Send the image to our server for processing through a simple form."
          />
          <Card
            title="Step 3: Get Description"
            description="Receive a description of the image processed by our server."
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}
