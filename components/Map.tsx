"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { fetchAltitudes } from "@/app/actions/altitude";
import { balticMarkers } from "@/lib/markers";
import { getIconByTag, getTagStyle } from "@/lib/map-utils";

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
          icon={getIconByTag(marker.tag)}
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
