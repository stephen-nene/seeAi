import React from "react";
import { Link } from "react-router-dom";
import IMG from '../assets/images/image2.jpeg'
import take from '../assets/images/takePhoto.jpg'
import process from '../assets/images/process1.jpeg'
import describe from '../assets/images/talking.jpeg'

export default function LandingPage({ darkMode }) {
  return (
    <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} `}>
      {/* Intro Section */}
      <IntroSection darkMode={darkMode} />

      {/* Feature Section */}
      <FeatureSection />

      {/* About Section */}
      <AboutSection />
    </div>
  );
}

function IntroSection({ darkMode }) {
  return (
    <div className="relativ e h-scr een bg-cover bg-center" style={{ backgroundImage: `url(${IMG})` }}>
      <div className={`p-4 absolu te inset-0 flex flex-col items-center justify-center bg-opacity-40 ${darkMode ? "bg-black" : "bg-white"}`}>
        <h1 className="text-5xl font-bold mb-4">seeAI</h1>
        <p className="text-xl mb-6">Describe your world through images and text!</p>
        <a href="/See" target="_blank" rel="noopener noreferrer">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View Project</button>
        </a>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Step 1: Take a Photo"
          description="Capture a photo using your camera or upload an image from your computer."
          imageUrl={take}    
              />
        <FeatureCard
          title="Step 2: Send to Server"
          description="Send the image to our server for processing through a simple form."
          imageUrl={process}
        />
        <FeatureCard
          title="Step 3: Get Description"
          description="Receive a description of the image processed by our server."
          imageUrl={describe}
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, imageUrl }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-200">
      <h2 className="text-3xl font-semibold text-center mb-8">About the Project</h2>
      <p className="text-lg mb-4">
        This project was inspired by my passion for image processing and the challenges I faced working in a supermarket, where I frequently interacted with customers needing fast and effective solutions. The project allowed me to apply my skills and gain more experience in real-world applications.
      </p>
      <p className="text-lg mb-4">
        The project is also part of my portfolio for Holberton School. You can view the project repository here: <a href="https://github.com/stephen-nene/seeAi" className="text-blue-500 underline">GitHub Repository</a>.
      </p>
      <div className="flex justify-center space-x-8 mb-8">
        <a href="https://linkedin.com/in/stevenene" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500">LinkedIn</a>
        <a href="https://github.com/stephen-nene" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500">GitHub</a>
        <a href="https://x.com/hackerOnBird" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500">Twitter</a>
      </div>
    </div>
  );
}
