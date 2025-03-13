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

function About() {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const mapRef = useRef(null);

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
                //rating: 4.7,
               // reviews: "1,534",
               // phone: "+44 20 7123 4567",
                //website: "https://www.riverviewcafe.london"
            }
        }
    ];

    // Use fallback data if locations is empty
    const displayLocations = locations.length > 0 ? locations : fallbackLocations;

    return (
        <div className="about-container">
            <h1>Our Restaurants</h1>
            <div className="map-container" style={{ position: "relative" }}>
                {/* Location Details Panel - Moved to right bottom */}
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
                    zoomControl={false} // Disable default zoom control
                    ref={mapRef}
                >
                    <ZoomControl position="bottomleft" /> {/* Place zoom controls at bottom left */}
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
            
            <div className="restaurant-list" style={{ marginTop: "20px" }}>
                <h2>Restaurant List</h2>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {displayLocations.map((place, index) => (
                        <li key={index} style={{ 
                            margin: "10px 0", 
                            padding: "10px", 
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: selectedLocation && selectedLocation.properties.name === place.properties.name ? "#f0f0f0" : "white"
                        }}
                        onClick={() => setSelectedLocation(place)}
                        >
                            <h3>{place.properties.name}</h3>
                            <p>{place.properties.address_line2}</p>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default About;// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet"; // Import Leaflet
// import "leaflet/dist/leaflet.css";

// // Fix for default marker icon
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow,
//     iconSize: [25, 41], // Size of the icon
//     iconAnchor: [12, 41], // Point of the icon which will correspond to the marker's location
//     popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
//     shadowSize: [41, 41], // Size of the shadow
// });

// L.Marker.prototype.options.icon = DefaultIcon; // Set the default icon

// function About() {
//     const [locations, setLocations] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:5000/locations")
//             .then((res) => res.json())
//             .then((data) => setLocations(data.features))
//             .catch((err) => console.error("Error fetching locations:", err));
//     }, []);

//     return (
//         <div>
//             <h1>Nearby Restaurants</h1>
//             <MapContainer
//                 center={[51.508037, -0.128049]}
//                 zoom={16}
//                 style={{ height: "400px", width: "80%" }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {locations.map((place, index) => (
//                     <Marker
//                         key={index}
//                         position={[place.properties.lat, place.properties.lon]}
//                     >
//                         <Popup>
//                             <strong>{place.properties.name}</strong> <br />
//                             {place.properties.address_line2}
//                         </Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>
//         </div>
//     );
// }

// export default About;