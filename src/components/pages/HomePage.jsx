import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home text-center p-10">
      <h1 className="text-3xl font-bold">Welcome to Our Restaurant!</h1>
      
      <h2 className="text-2xl text-blue-600 underline">
        <Link to="/menu">
      

      {/* Corrected Button with Proper Transition */}
      <button className="mt-12 bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-110 hover:bg-indigo-500">
      Explore our Menu
      </button>
      </Link>
      </h2>
    </div>
  );
}

export default HomePage;