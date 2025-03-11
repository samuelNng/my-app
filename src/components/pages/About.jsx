import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";

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

function About() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/locations")
            .then((res) => res.json())
            .then((data) => setLocations(data.features))
            .catch((err) => console.error("Error fetching locations:", err));
    }, []);

    return (
        <div>
            <h1>Nearby Restaurants</h1>
            <MapContainer
                center={[51.508037, -0.128049]}
                zoom={16}
                style={{ height: "400px", width: "80%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((place, index) => (
                    <Marker
                        key={index}
                        position={[place.properties.lat, place.properties.lon]}
                    >
                        <Popup>
                            <strong>{place.properties.name}</strong> <br />
                            {place.properties.address_line2}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default About;