import { GeoJSON } from "geojson";

const polygons: GeoJSON[] = [
  {
    id: "028562620a089aebb2b4e9ed5dde2b56",
    type: "Feature",
    properties: {
      name: "Area 51",
    },
    geometry: {
      coordinates: [
        [
          [-159.33946617863447, 22.083802295702256],
          [-159.3474521930454, 22.07286256408949],
          [-159.3267927209823, 22.070931935275226],
          [-159.33946617863447, 22.083802295702256],
        ],
      ],
      type: "Polygon",
    },
  },
  {
    id: "2fab20e2f4dc13c3c1eb0785636e7246",
    type: "Feature",
    properties: {
      name: "Area 52",
    },
    geometry: {
      coordinates: [
        [
          [-159.37396674164427, 22.081143280976974],
          [-159.37712068433714, 22.07348109935478],
          [-159.3829171195564, 22.07569290578998],
          [-159.37396674164427, 22.081143280976974],
        ],
      ],
      type: "Polygon",
    },
  },
];

export default polygons;
