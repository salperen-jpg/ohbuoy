"use server";

import axios from "axios";

export async function fetchAltitudes(
  locations: { latitude: number; longitude: number }[]
) {
  try {
    const { data } = await axios.post(
      "https://api.open-elevation.com/api/v1/lookup",
      {
        locations,
      }
    );

    if (!data.results || !Array.isArray(data.results)) {
      return null;
    }

    return data.results.map(
      (result: { elevation: number }) => result.elevation
    );
  } catch (error) {
    return null;
  }
}
