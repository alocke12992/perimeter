import { useState, useCallback } from "react";

import { Map } from "react-map-gl";
import data from "./mocks";

const TOKEN = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;

const LAT = import.meta.env.VITE_CENTER_LAT;
const LONG = import.meta.env.VITE_CENTER_LON;

import "./App.css";
import DrawControl from "./Draw";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

function App() {
  const [features, setFeatures] = useState(data);

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const onLoadDraw = useCallback(
    (drawInstance: MapboxDraw | null) => {
      if (!drawInstance || !features.length) return;
      if (features.length) {
        features.forEach((feature) => {
          drawInstance.add(feature);
          const polygonId = feature.id;
          drawInstance.changeMode("simple_select", { featureId: polygonId });
        });
      }
    },
    [features]
  );

  return (
    <div className="App">
      <Map
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/standard"
        style={{
          width: "100vh",
          height: "100vh",
        }}
        initialViewState={{
          longitude: LONG,
          latitude: LAT,
          zoom: 11,
        }}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onLoad={onLoadDraw}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
    </div>
  );
}

export default App;
