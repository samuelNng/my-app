import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";

// Import sample location data directly
import locationData from '../backend/locations.json'; 

// Fix for default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to the marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // Size of the shadow
});

L.Marker.prototype.options.icon = DefaultIcon; // Set the default icon

// Component to display location details panel
const LocationDetailsPanel = ({ location }) => {
    if (!location) return null;
    
    return (
        <div className="location-details-panel">
            <h3>{location.properties.name}</h3>
            <p>{location.properties.address_line2}</p>
            {location.properties.rating && (
                <div className="rating">
                    {location.properties.reviews && (
                        <span> ({location.properties.reviews} reviews)</span>
                    )}
                </div>
            )}
            {location.properties.phone && (
                <p>Phone: {location.properties.phone}</p>
            )}
            {location.properties.website && (
                <p><a href={location.properties.website} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            )}
        </div>
    );
};

// Map event handler component
const MapEventHandler = ({ setSelectedLocation }) => {
    useMapEvents({
        click: () => {
            setSelectedLocation(null);
        }
    });
    return null;
};

// Component to fly to a marker when a location is selected
const FlyToMarker = ({ selectedLocation }) => {
    const map = useMap();
    
    useEffect(() => {
        if (selectedLocation) {
            map.flyTo(
                [selectedLocation.properties.lat, selectedLocation.properties.lon],
                16,
                {
                    animate: true,
                    duration: 1
                }
            );
        }
    }, [selectedLocation, map]);
    
    return null;
};

const Contact = () => {
    // Map state
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const mapRef = useRef(null);

    // Contact form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        // Set locations directly from the imported JSON file
        setLocations(locationData.features || []);
    }, []);

    // Fallback data in case the JSON import fails or is empty
    const fallbackLocations = [
        {
            properties: {
                name: "Machiya",
                address_line2: "5 Panton St, London SW1Y 4DL",
                lat: 51.5098,
                lon: -0.1315,
                rating: 4.5,
                reviews: "2,806",
                phone: "+44 20 7839 3512",
                website: "https://www.machiya.london"
            }
        },
        {
            properties: {
                name: "Sexy Fish Mayfair",
                address_line2: "Berkeley Square, London",
                lat: 51.5107,
                lon: -0.1425,
                rating: 4.2,
                reviews: "1,964"
            }
        },
        {
            properties: {
                name: "The National Gallery Restaurant",
                address_line2: "Trafalgar Square, London",
                lat: 51.5089,
                lon: -0.1283,
                rating: 4.3,
                reviews: "1,205"
            }
        },
        {
            properties: {
                name: "River View Cafe",
                address_line2: "45 Thames Embankment, London",
                lat: 51.5074,
                lon: -0.1145,
            }
        }
    ];

    // Use fallback data if locations is empty
    const displayLocations = locations.length > 0 ? locations : fallbackLocations;

    // Handle Input Change for contact form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Thank you! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" }); // Reset form
    };

    return (
        <div className="contact-page">
            {/* Contact Header */}
            <div className="bg-gray-900 py-16 text-white">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                        Contact Us
                    </h2>
                    <p className="mt-6 text-lg text-gray-300">
                        Have questions or want to make a reservation? Get in touch with us or visit one of our restaurants!
                    </p>
                </div>
            </div>

            {/* Restaurant Map Section */}
            <div className="bg-white py-12">
                <div className="mx-auto max-w-5xl px-6">
                    
                    <div className="map-container" style={{ position: "relative" }}>
                        {/* Location Details Panel */}
                        <div style={{ 
                            position: "absolute", 
                            top: "10px", 
                            left: "10px", 
                            zIndex: 1000, 
                            backgroundColor: "white", 
                            padding: "15px", 
                            borderRadius: "5px", 
                            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                            maxWidth: "300px"
                        }}>
                            {selectedLocation ? (
                                <LocationDetailsPanel location={selectedLocation} />
                            ) : (
                                <div>
                                    <h3>Restaurant Details</h3>
                                    <p>Click on a marker to see details</p>
                                </div>
                            )}
                        </div>
                        
                        <MapContainer
                            center={[51.508037, -0.128049]}
                            zoom={13}
                            style={{ height: "500px", width: "100%" }}
                            zoomControl={false}
                            ref={mapRef}
                        >
                            <ZoomControl position="bottomleft" />
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <MapEventHandler setSelectedLocation={setSelectedLocation} />
                            <FlyToMarker selectedLocation={selectedLocation} />
                            {displayLocations.map((place, index) => (
                                <Marker
                                    key={index}
                                    position={[place.properties.lat, place.properties.lon]}
                                    eventHandlers={{
                                        click: () => {
                                            setSelectedLocation(place);
                                        }
                                    }}
                                >
                                    <Popup>
                                        <strong>{place.properties.name}</strong> <br />
                                        {place.properties.address_line2}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                    
                    {/* Restaurant List */}
                    <div className="restaurant-list mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Restaurant List</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {displayLocations.map((place, index) => (
                                <div key={index} 
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                        selectedLocation && selectedLocation.properties.name === place.properties.name 
                                        ? "border-purple-500 bg-purple-50" 
                                        : "border-gray-200 hover:border-purple-300"
                                    }`}
                                    onClick={() => setSelectedLocation(place)}
                                >
                                    <h4 className="text-lg font-semibold">{place.properties.name}</h4>
                                    <p className="text-gray-600">{place.properties.address_line2}</p>
                                    {place.properties.phone && <p className="text-gray-600">{place.properties.phone}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-gray-900 py-16 text-white">
                <div className="mx-auto max-w-5xl px-6">
                    {/* Contact Info */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold">Our Contact Information</h3>
                        <p className="mt-4 text-lg">📧 Email: Shokudo@gmail.com</p>
                        <p className="mt-2 text-lg">📍 Address: 12 Westminster Avenue, London</p>
                        <p className="mt-2 text-lg">📞 Phone: +123 456 7890</p>
                    </div>

                    {/* Reservation Form */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">Reservations</h3>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;// 2import React, { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     alert("Thank you! We will get back to you soon.");
//     setFormData({ name: "", email: "", message: "" }); // Reset form
//   };

//   return (
//     <>
//       <div className="bg-gray-900 py-24 sm:py-32 text-white">
//         <div className="mx-auto max-w-5xl px-6">
//           <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
//             Contact Us
//           </h2>
//           <p className="mt-6 text-lg text-gray-300">
//             Have questions or want to make a reservation? Get in touch with us!
//           </p>

//           {/* Contact Info */}
//           <div className="mt-10">
//             <h3 className="text-2xl font-semibold">Our Contact</h3>
//             <p className="mt-2 text-lg">📧 Email: abc@gmail.com</p>
//             <p className="mt-2 text-lg">📍 Address: 123 Main Street, City, Country</p>
//             <p className="mt-2 text-lg">📞 Phone: +123 456 7890</p>
//           </div>

//           {/* Reservation Form */}
//           <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h3 className="text-2xl font-semibold">Leave Your Contact</h3>
//             <form className="mt-6" onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-300">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-300">Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="4"
//                   className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500"
//                   placeholder="Your message..."
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact;
// import React from 'react';

// const Contact=()=>{
//     const links = [
//         { name: 'Open roles', href: '#' },
//         { name: 'Internship program', href: '#' },
//         { name: 'Our values', href: '#' },
//         { name: 'Meet our leadership', href: '#' },
//       ]
//       const stats = [
//         { name: 'Offices worldwide', value: '12' },
//         { name: 'Full-time colleagues', value: '300+' },
//         { name: 'Hours per week', value: '40' },
//         { name: 'Paid time off', value: 'Unlimited' },
//       ]
//     return(
//         <>
//         <h1>Contact</h1>
//         <h2>abc@gmail.com</h2>
//          <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
//       <img
//         alt=""
//         src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
//         className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
//       />
//       <div
//         aria-hidden="true"
//         className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
//       >
//         <div
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//           className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
//         />
//       </div>
//       <div
//         aria-hidden="true"
//         className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
//       >
//         <div
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//           className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
//         />
//       </div>
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:mx-0">
//           <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Work with us</h2>
//           <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
//             Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
//             fugiat veniam occaecat fugiat.
//           </p>
//         </div>
//         <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
//             {links.map((link) => (
//               <a key={link.name} href={link.href}>
//                 {link.name} <span aria-hidden="true">&rarr;</span>
//               </a>
//             ))}
//           </div>
//           <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
//             {stats.map((stat) => (
//               <div key={stat.name} className="flex flex-col-reverse gap-1">
//                 <dt className="text-base/7 text-gray-300">{stat.name}</dt>
//                 <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
//               </div>
//             ))}
//           </dl>
//         </div>
//       </div>
//     </div>

    
  

//         </>
        
//     )


// }
// export default Contact;

