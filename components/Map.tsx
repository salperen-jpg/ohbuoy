"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { LifeBuoy } from "lucide-react";

// Create custom icon using Lucide's LifeBuoy icon
const buoyIconHtml = renderToString(
  <LifeBuoy size={32} color='#ef4444' strokeWidth={2} />
);

const icon = L.divIcon({
  html: buoyIconHtml,
  className: "custom-buoy-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Sample coordinates in the Baltic Sea
const balticMarkers = [
  { id: 1, position: [59.3293, 18.0686], name: "Stockholm" },
  { id: 2, position: [59.9139, 10.7522], name: "Oslo" },
  { id: 3, position: [60.1695, 24.9354], name: "Helsinki" },
  { id: 4, position: [59.437, 24.7536], name: "Tallinn" },
  { id: 5, position: [56.9496, 24.1052], name: "Riga" },
  // Gdansk Bay - in the water
  { id: 6, position: [54.6523, 18.8234], name: "Gdansk Bay - Point 1" },
  { id: 7, position: [54.7845, 19.1256], name: "Gdansk Bay - Point 2" },
  { id: 8, position: [54.5234, 19.2845], name: "Gdansk Bay - Point 3" },
  // Koszalin coast - offshore in the Baltic
  { id: 9, position: [54.6245, 15.8523], name: "Koszalin Coast - Point 1" },
  { id: 10, position: [54.7185, 16.0847], name: "Koszalin Coast - Point 2" },
  { id: 11, position: [54.5623, 16.2345], name: "Koszalin Coast - Point 3" },
  { id: 12, position: [54.8456, 15.7521], name: "Koszalin Coast - Point 4" },
  { id: 13, position: [54.6789, 16.3234], name: "Koszalin Coast - Point 5" },
];

export default function Map() {
  return (
    <MapContainer
      center={[54.65, 17.5]}
      zoom={8}
      style={{ height: "600px", width: "100%" }}
      className='z-0'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {balticMarkers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position as [number, number]}
          icon={icon}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
