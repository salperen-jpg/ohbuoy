import { renderToString } from "react-dom/server";
import { LifeBuoy } from "lucide-react";
import L from "leaflet";

// Create custom icons using Lucide's LifeBuoy icon with different colors
const alertIconHtml = renderToString(
  <LifeBuoy size={32} color='#ef4444' strokeWidth={2} />
);

const warningIconHtml = renderToString(
  <LifeBuoy size={32} color='#eab308' strokeWidth={2} />
);

const normalIconHtml = renderToString(
  <LifeBuoy size={32} color='#22c55e' strokeWidth={2} />
);

export const alertIcon = L.divIcon({
  html: alertIconHtml,
  className: "custom-buoy-icon alert-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export const warningIcon = L.divIcon({
  html: warningIconHtml,
  className: "custom-buoy-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export const normalIcon = L.divIcon({
  html: normalIconHtml,
  className: "custom-buoy-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export const getIconByTag = (tag: string) => {
  switch (tag) {
    case "Alert":
      return alertIcon;
    case "Warning":
      return warningIcon;
    default:
      return normalIcon;
  }
};

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
