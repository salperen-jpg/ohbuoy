export const balticMarkers: Array<{
  id: number;
  position: number[];
  name: string;
  tag: "Alert" | "Warning" | "Normal";
  altitude: number;
}> = [
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

export type MarkerTag = "Alert" | "Warning" | "Normal";
