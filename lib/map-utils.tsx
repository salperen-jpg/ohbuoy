import { renderToString } from "react-dom/server";
import { LifeBuoy } from "lucide-react";
import L from "leaflet";

// Create custom icon using Lucide's LifeBuoy icon
const buoyIconHtml = renderToString(
  <LifeBuoy size={32} color="#ef4444" strokeWidth={2} />
);

export const icon = L.divIcon({
  html: buoyIconHtml,
  className: "custom-buoy-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export const alertIcon = L.divIcon({
  html: buoyIconHtml,
  className: "custom-buoy-icon alert-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export const getTagStyle = (tag: string) => {
  switch (tag) {
    case "Alert":
      return "bg-red-500 text-white";
    case "Warning":
      return "bg-yellow-500 text-black";
    default:
      return "bg-green-500 text-white";
  }
};
