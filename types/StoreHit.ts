export type GeoHit = {
  fields?: {
    name: string;
    hasclosed: string;
    countrycode: string;
    city: string;
    geoloc: Array<number>;
    state: string;
    lat: string;
    lng: string;
    supporter: number;
    placeidh: string;
  };
  objectID: string;
  _geoloc: { lat: string; lng: string };
  geometry: {
    coordinates: [number, number];
  };
};
