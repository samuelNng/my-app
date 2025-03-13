import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src="japanese restaurant  (1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 px-6">
        <h1 className="text-4xl md:text-6xl font-bold animate-fadeIn">
          Welcome to Our Restaurant!
        </h1>
        <p className="text-lg md:text-xl mt-4 animate-fadeIn delay-150">
          Experience the best dining with us!
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <Link to="/menu">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500">
              Explore Our Menu
            </button>
          </Link>
          <Link to="/orders">

          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-600">
            Order Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
// import React from "react";
// import { Link } from "react-router-dom";

// function HomePage() {
//   return (


//     <div className="relative w-full h-screen overflow-hidden">
      
//         {/* Background Video */}
//       <video
//       className="absolute top-0 left-0 w-full h-full object-cover"
//       //controls
//       autoPlay
//       muted
//       loop
//       >
//     <source src="restaurant.mp4" type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>

// <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-3xl font-bold">
//     Welcome to Our Website
//   </div>

//       <h1 className="text-3xl font-bold">Welcome to Our Restaurant!</h1>
      
//       <h2 className="text-2xl text-blue-600 underline">
//         <Link to="/menu">
      

//       {/* Corrected Button with Proper Transition */}
//       <button className="mt-12 bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-110 hover:bg-indigo-500">
//       Explore our Menu
//       </button>
//       </Link>
//       <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>



//       </h2>
//     </div>
    
//   );
// }

// export default HomePage;