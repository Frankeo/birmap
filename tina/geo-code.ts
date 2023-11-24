
import {
  GOOGLE_GEOCODE_BASE_DIR,
  GOOGLE_GEOCODE_KEYS,
  GOOGLE_MAPS_KEY,
} from "./constants";

interface ResultGeocode {
  results: ContentGeocode[];
}

interface ContentGeocode {
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  }
}

interface Position {
  lat: number;
  lng: number;
}

export const getGeocode = async (address: string): Promise<Position> => {
  const googleGeocode = new URLSearchParams();
  googleGeocode.append(GOOGLE_GEOCODE_KEYS.ADDRESS, address)
  googleGeocode.append(GOOGLE_GEOCODE_KEYS.KEY, GOOGLE_MAPS_KEY)
  const url = `${GOOGLE_GEOCODE_BASE_DIR}${googleGeocode.toString()}`
  const response = await fetch(url);
  if(response.status !== 200) {
    throw new Error("Problem translating the address");
  }
  const content = await response.json() as ResultGeocode;
  if(content.results.length === 0) {
    throw new Error("Problem with address resolution");
  }
  return content.results[0].geometry.location;
};
