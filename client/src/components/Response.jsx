import React from "react";

export default function Response({ output }) {
  return (
    <div className="mt-8 mx-4 sm:mx-8 md:mx-12 lg:mx-16">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Server Response</h2>
        <p className="text-gray-600">{output || "No response from server"}</p>
      </div>
    </div>
  );
}
