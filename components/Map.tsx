"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { LifeBuoy } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAltitudes } from "@/app/actions/altitude";

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

const alertIcon = L.divIcon({
  html: buoyIconHtml,
  className: "custom-buoy-icon alert-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Sample coordinates in the Baltic Sea
const balticMarkers = [
  {
    id: 1,
    position: [59.3293, 18.0686],
    name: "Stockholm",
    tag: "Normal",
    altitude: 0,
  },
  {
    id: 2,
    position: [59.9139, 10.7522],
    name: "Oslo",
    tag: "Normal",
    altitude: 0,
  },
  {
    id: 3,
    position: [60.1695, 24.9354],
    name: "Helsinki",
    tag: "Alert",
    altitude: 0,
  },
  {
    id: 4,
    position: [59.437, 24.7536],
    name: "Tallinn",
    tag: "Warning",
    altitude: 0,
  },
  {
    id: 5,
    position: [56.9496, 24.1052],
    name: "Riga",
    tag: "Normal",
    altitude: 0,
  },
  // Gdansk Bay - in the water (spread out more)
  {
    id: 6,
    position: [54.8523, 19.1234],
    name: "Gdansk Bay - Point 1",
    tag: "Alert",
    altitude: -5,
  },
  {
    id: 7,
    position: [55.1845, 19.6256],
    name: "Gdansk Bay - Point 2",
    tag: "Normal",
    altitude: -3,
  },
  {
    id: 8,
    position: [54.5234, 19.8845],
    name: "Gdansk Bay - Point 3",
    tag: "Warning",
    altitude: -8,
  },
  // Koszalin coast - offshore in the Baltic (more spread)
  {
    id: 9,
    position: [55.0245, 15.5523],
    name: "Koszalin Coast - Point 1",
    tag: "Normal",
    altitude: -4,
  },
  {
    id: 10,
    position: [55.3185, 16.2847],
    name: "Koszalin Coast - Point 2",
    tag: "Alert",
    altitude: -6,
  },
  {
    id: 11,
    position: [54.7623, 15.9345],
    name: "Koszalin Coast - Point 3",
    tag: "Normal",
    altitude: -2,
  },
  {
    id: 12,
    position: [55.5456, 15.3521],
    name: "Koszalin Coast - Point 4",
    tag: "Warning",
    altitude: -7,
  },
  {
    id: 13,
    position: [54.9789, 16.6234],
    name: "Koszalin Coast - Point 5",
    tag: "Alert",
    altitude: -5,
  },
];

const getTagStyle = (tag: string) => {
  switch (tag) {
    case "Alert":
      return "bg-red-500 text-white";
    case "Warning":
      return "bg-yellow-500 text-black";
    default:
      return "bg-green-500 text-white";
  }
};

export default function Map() {
  const [markersWithElevation, setMarkersWithElevation] =
    useState(balticMarkers);

  useEffect(() => {
    async function loadElevations() {
      const locations = balticMarkers.map((m) => ({
        latitude: m.position[0],
        longitude: m.position[1],
      }));

      const elevations = await fetchAltitudes(locations);

      if (elevations) {
        const updatedMarkers = balticMarkers.map((marker, index) => ({
          ...marker,
          altitude: elevations[index] ?? marker.altitude,
        }));
        setMarkersWithElevation(updatedMarkers);
      }
    }

    loadElevations();
  }, []);

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
      {markersWithElevation.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position as [number, number]}
          icon={marker.tag === "Alert" ? alertIcon : icon}
        >
          <Popup>
            <div className='min-w-[200px]'>
              <h3 className='font-bold text-lg mb-2'>{marker.name}</h3>
              <div className='space-y-2'>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getTagStyle(
                    marker.tag
                  )}`}
                >
                  {marker.tag}
                </span>
                <p className='text-sm text-gray-600'>
                  <strong>Altitude:</strong> {marker.altitude ?? 0}m{" "}
                  {marker.altitude < 0
                    ? "(below sea level)"
                    : "(above sea level)"}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
